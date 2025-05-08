# Azure cli commands
[Official Doc](https://learn.microsoft.com/en-us/cli/azure/databricks?view=azure-cli-latest)

```sh
az databricks workspace create	# Create a new workspace.
az databricks workspace delete	# Delete the workspace.
az databricks workspace list	# Get all the workspaces.

# check whether a catalog exists
databricks catalogs list | grep "company_a"

# Create folder structure for catalog"
databricks sql query "CREATE CATALOG your_catalog"
databricks sql query "CREATE SCHEMA your_catalog.dirA"
databricks sql query "CREATE SCHEMA your_catalog.dirB"
databricks sql query "CREATE SCHEMA your_catalog.dirC"
databricks sql query "CREATE VOLUME your_catalog.dirC.v1"
```

```sh
az role assignment create \
  --assignee-object-id "467ca2a6-1ebb-4585-9c77-6eefd296b5bd" \
  --role "Contributor" \
  --resource-group "rg-kineo-analytics"

az role assignment create \
  --assignee-object-id "467ca2a6-1ebb-4585-9c77-6eefd296b5bd" \
  --role "Contributor" \
  --scope "/subscriptions/3dc7c9f1-6fc5-47da-aebf-fc32dc3f7643/resourceGroups/rg-kineo-analytics"
```