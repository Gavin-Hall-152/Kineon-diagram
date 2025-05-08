# We strongly recommend using the required_providers block to set the
# Azure Provider source and version being used
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>4.27.0"
    }
    databricks = {
      source = "databricks/databricks"
      version = ">=1.50.0"
    }
  }
  required_version = ">=1.5.7"
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  # This is only required when the User, Service Principal, or Identity 
  # running Terraform lacks the permissions to register Azure Resource Providers.
  resource_provider_registrations = "none"
  features {}
  subscription_id = "3dc7c9f1-6fc5-47da-aebf-fc32dc3f7643"
}

# Configure the Databricks provider
# The newer CLI sets up authentication that the provider can use automatically
provider "databricks" {
  # If using the newer CLI, it will handle auth via environment variables
  # DATABRICKS_HOST and DATABRICKS_TOKEN are set by the configure_databricks_cli.sh script
  # No explicit configuration needed as it uses the CLI's auth settings
}

# Keep the databricks_provider alias for backward compatibility with existing state
provider "databricks" {
  alias = "databricks_provider"
  # Use environment variables for authentication
  # These will be set by the configure_databricks_cli.sh script
}
