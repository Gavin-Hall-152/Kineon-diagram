terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>4.27.0"
    }
  }
  required_version = ">=1.5.7"
}

provider "azurerm" {
  resource_provider_registrations = "none"
  features {}
  subscription_id = "3dc7c9f1-6fc5-47da-aebf-fc32dc3f7643"
} 