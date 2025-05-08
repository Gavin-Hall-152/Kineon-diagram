/**
 * Data source for the existing Resource Group where the Function App resides.
 */
data "azurerm_resource_group" "sftp_rg" {
  name = var.resource_group_name
}

/**
 * Data source for the existing App Service Plan hosting the Function App.
 */
data "azurerm_service_plan" "sftp_plan" {
  name                = var.app_service_plan_name
  resource_group_name = data.azurerm_resource_group.sftp_rg.name
}

/**
 * Data source for the existing Storage Account used by the Function App.
 * Using a data source instead of creating a new storage account prevents replacement.
 */
data "azurerm_storage_account" "sftp_storage" {
  name                = "sftpa071" # Use the existing storage account name
  resource_group_name = data.azurerm_resource_group.sftp_rg.name
}

/**
 * Defines the Azure Linux Function App resource.
 */
resource "azurerm_linux_function_app" "sftp_function_app" {
  name                       = var.function_app_name
  resource_group_name        = data.azurerm_resource_group.sftp_rg.name
  location                   = "canadacentral" # Explicitly set to match existing Function App location
  storage_account_name       = data.azurerm_storage_account.sftp_storage.name # Reference existing storage account
  storage_account_access_key = data.azurerm_storage_account.sftp_storage.primary_access_key
  service_plan_id            = data.azurerm_service_plan.sftp_plan.id
  https_only                 = true # Enforce HTTPS

  /**
   * Site configuration for the Function App.
   * Defines runtime, version, and other settings.
   */
  site_config {
    application_stack {
      python_version = "3.11" # Updated to match existing Function App
    }
    always_on = false # Set to true if using a higher tier plan and need cold start avoidance
    ftps_state = "FtpsOnly" # Recommended security setting
  }

  /**
   * Application settings for the Function App.
   * AzureWebJobsStorage is essential for function triggers and logging.
   * FUNCTIONS_WORKER_RUNTIME specifies the language worker.
   * Add any other required settings for your SFTP function (e.g., SFTP credentials, ideally from Key Vault).
   */
  app_settings = {
    "FUNCTIONS_EXTENSION_VERSION" = "~4"
    "AzureWebJobsStorage"         = data.azurerm_storage_account.sftp_storage.primary_connection_string
    "FUNCTIONS_WORKER_RUNTIME"    = "python" # Adjust if using a different language
    "Azure_Functions_Python_Startup_File" = "function_app.py"
    # Add other app settings your function needs here
    # "SFTP_HOST" = "your_sftp_host"
    # "SFTP_USER" = "your_sftp_user"
    # Consider using Key Vault references for secrets:
    # "SFTP_PASSWORD" = "@Microsoft.KeyVault(SecretUri=https://yourkeyvault.vault.azure.net/secrets/sftp-password/your-secret-version)"
  }

  /**
   * Identity block (optional but recommended).
   * Enables Managed Identity for accessing other Azure resources securely (e.g., Key Vault, Storage).
   */
  identity {
    type = "SystemAssigned"
  }

  /**
   * Lifecycle block to prevent Terraform from modifying certain attributes
   * that we want to preserve from the existing Function App.
   */
  lifecycle {
    ignore_changes = [
      tags,                                          # Preserve existing tags (e.g., Application Insights links)
      site_config.0.cors,                            # Preserve existing CORS settings
      site_config.0.application_insights_connection_string, # Preserve Application Insights connection
      client_certificate_mode,                       # Preserve certificate settings
      webdeploy_publish_basic_authentication_enabled, # Preserve auth settings
      ftp_publish_basic_authentication_enabled        # Preserve FTP auth settings
    ]
  }
}

/**
 * Outputs the default hostname of the deployed Function App.
 */
output "function_app_default_hostname" {
  value       = azurerm_linux_function_app.sftp_function_app.default_hostname
  description = "The default hostname of the Kineo SFTP Function App"
}

# /**
#  * Defines the function binding for the timer-triggered SFTP function.
#  */
# resource "azurerm_function_app_function" "sftp_timer_function" {
#   name            = "uploadandpull"
#   function_app_id = azurerm_linux_function_app.sftp_function_app.id
#   language        = "Python"
  
#   config_json = jsonencode({
#     "bindings" = [
#       {
#         "name"     = "myTimer"
#         "type"     = "timerTrigger"
#         "direction" = "in"
#         "schedule" = "0 1 * * *"
#         "runOnStartup" = false
#       }
#     ]
#   })
# } 
