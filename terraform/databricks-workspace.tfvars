create_resource_group = true
create_databricks_workspace = true
create_databricks_catalogs = true
resource_group_name = "rg-kineo-analytics"
databricks_workspace_name = "databricks-kineo-analytics"
company_names = {
    company_a = {
        name = "company_a"
        grant_principals = [
            "account users"
        ]
    },
    company_b = {
        name = "company_b"
        grant_principals = [
            "account users"
        ]
    },
    company_c = {
        name = "company_c"
        grant_principals = [
            "account users"
        ]
    }
}