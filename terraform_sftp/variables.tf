/**
 * @description The name of the existing Resource Group containing the Function App and Plan.
 * @type string
 */
variable "resource_group_name" {
  type        = string
  description = "Name of the Azure Resource Group."
  default     = "SFTP" # Defaulting based on your provided info
}

/**
 * @description The name of the existing App Service Plan.
 * @type string
 */
variable "app_service_plan_name" {
  type        = string
  description = "Name of the existing App Service Plan."
  default     = "ASP-SFTP-ac5f" # Defaulting based on your provided info
}

/**
 * @description The name for the Azure Function App.
 * @type string
 */
variable "function_app_name" {
  type        = string
  description = "Name of the Azure Function App."
  default     = "kineosftp" # Defaulting based on your provided info
} 