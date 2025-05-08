variable "create_resource_group" {
  type    = bool
  default = false
}

variable "resource_group_name" {
  type = string
  default = "rg-kineo-analytics"
}

# Create a resource group. "team_kin" here is just an arbitrary name (an alias used in your local terraform environment).
resource "azurerm_resource_group" "team_kin" {
  count = var.create_resource_group ? 1 : 0
  name     = var.resource_group_name
  location = "East US"
}

variable "create_databricks_workspace" {
  type    = bool
  default = false
}

variable "databricks_workspace_name" {
  type = string
  default = "databricks-kineo-analytics"
}

# This will create a standard databricks workspace with public network access
resource "azurerm_databricks_workspace" "team_kin_databricks" {
  count                       = var.create_databricks_workspace ? 1 : 0
  name                        = var.databricks_workspace_name
  resource_group_name         = var.resource_group_name
  location                    = var.create_resource_group ? azurerm_resource_group.team_kin[0].location : "East US"
  sku                         = "premium"
  public_network_access_enabled = true
  
  tags = {
    Environment = "Development"
    Project = "KIN Analytics"
  }
}

# Data source to fetch existing workspace information when not creating it
data "azurerm_databricks_workspace" "existing_workspace" {
  count               = var.create_databricks_workspace ? 0 : 1
  name                = var.databricks_workspace_name
  resource_group_name = var.resource_group_name
}

# Use this to get the workspace ID regardless of whether it's being created or already exists
locals {
  workspace_id = var.create_databricks_workspace ? azurerm_databricks_workspace.team_kin_databricks[0].workspace_id : data.azurerm_databricks_workspace.existing_workspace[0].workspace_id
}

variable "company_names" {
  type = map(object({
    name = string
    grant_principals = list(string)
  }))
  description = "Company information including name and users to grant access to"
  default = {}
}

variable "create_databricks_catalogs" {
  type    = bool
  default = false
}

# Create databricks catalogs dynamically based on company_names
resource "databricks_catalog" "team_kin_catalogs" {
  for_each = var.create_databricks_catalogs ? var.company_names : {}
  name = each.value.name
  isolation_mode = "ISOLATED"
  comment = "Catalog for ${each.value.name}"
  force_destroy = true
  
  # Skip resource creation if it already exists
  lifecycle {
    # This will prevent Terraform from failing if the resource already exists
    ignore_changes = [isolation_mode, comment, storage_root, owner, metastore_id]
  }
  
  # Use the existing external location for storage if available
  # If error occurs with storage_root, comment out this line
  storage_root = try(
    "abfss://root@dbstoragelkrkwq4rqubjg.dfs.core.windows.net/4230356109678556/user/hive/warehouse/${each.value.name}",
    null
  )

  depends_on = [
    azurerm_databricks_workspace.team_kin_databricks
  ]
}

# bind the catalogs to the workspace
resource "databricks_workspace_binding" "team_kin_workspace_bindings" {
  for_each = var.create_databricks_catalogs ? var.company_names : {}
  securable_name = databricks_catalog.team_kin_catalogs[each.key].name
  workspace_id = local.workspace_id

  # Handle existing bindings gracefully
  lifecycle {
    ignore_changes = [binding_type]
  }

  depends_on = [
    databricks_catalog.team_kin_catalogs
  ]
}

# Create raw_data schemas for each company
resource "databricks_schema" "raw_data_schemas" {
  for_each = var.create_databricks_catalogs ? var.company_names : {}
  name       = "raw_data"
  catalog_name = databricks_catalog.team_kin_catalogs[each.key].name
  comment    = "Raw data"

  # Handle existing schemas gracefully
  lifecycle {
    ignore_changes = [comment, owner, properties]
  }

  depends_on = [
    databricks_catalog.team_kin_catalogs,
    databricks_workspace_binding.team_kin_workspace_bindings
  ]
}

# Create cleaned_data schemas for each company
resource "databricks_schema" "cleaned_data_schemas" {
  for_each = var.create_databricks_catalogs ? var.company_names : {}
  name       = "cleaned_data"
  catalog_name = databricks_catalog.team_kin_catalogs[each.key].name
  comment    = "Cleaned data"

  # Handle existing schemas gracefully
  lifecycle {
    ignore_changes = [comment, owner, properties]
  }

  depends_on = [
    databricks_catalog.team_kin_catalogs,
    databricks_workspace_binding.team_kin_workspace_bindings
  ]
}

# Create cleaned_data schemas for each company
resource "databricks_schema" "default_schemas" {
  for_each = var.create_databricks_catalogs ? var.company_names : {}
  name       = "schema"
  catalog_name = databricks_catalog.team_kin_catalogs[each.key].name
  comment    = "Default schema"

  # Handle existing schemas gracefully
  lifecycle {
    ignore_changes = [comment, owner, properties]
  }

  depends_on = [
    databricks_catalog.team_kin_catalogs,
    databricks_workspace_binding.team_kin_workspace_bindings
  ]
}

# Create volumes for each company
resource "databricks_volume" "company_data_volumes" {
  for_each = var.create_databricks_catalogs ? var.company_names : {}
  catalog_name = databricks_catalog.team_kin_catalogs[each.key].name
  schema_name  = databricks_schema.raw_data_schemas[each.key].name
  comment      = "Volume inside raw_data"
  volume_type  = "MANAGED"
  name         = "${each.value.name}_data"

  # Handle existing volumes gracefully
  lifecycle {
    ignore_changes = [comment, owner, volume_type]
  }

  depends_on = [
    databricks_schema.raw_data_schemas
  ]
}

# Grant permissions to users for each catalog
resource "databricks_grants" "catalog_grants" {
  for_each = var.create_databricks_catalogs ? var.company_names : {}
  catalog = databricks_catalog.team_kin_catalogs[each.key].name

  dynamic "grant" {
    for_each = each.value.grant_principals
    content {
      principal  = grant.value
      privileges = ["ALL_PRIVILEGES"]
    }
  }

  depends_on = [
    databricks_catalog.team_kin_catalogs,
    databricks_workspace_binding.team_kin_workspace_bindings
  ]
}
