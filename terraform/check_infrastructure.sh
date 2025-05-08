#!/bin/bash

# Script to check if infrastructure resources exist and update databricks-workspace.tfvars

# Function to update Terraform variable
update_tfvar() {
  local var_name=$1
  local new_value=$2
  local tfvars_file=$3
  
  # Check if variable exists in file and update it
  if grep -q "^${var_name} =" "$tfvars_file"; then
    sed -i "s/^${var_name} =.*/${var_name} = ${new_value}/" "$tfvars_file"
  else
    echo "${var_name} = ${new_value}" >> "$tfvars_file"
  fi
}

# Function to update Terraform boolean variable
update_tfvar_bool() {
  local var_name=$1
  local new_value=$2
  local tfvars_file=$3
  
  # Check if variable exists in file and update it
  if grep -q "^${var_name} =" "$tfvars_file"; then
    sed -i "s/^${var_name} =.*/${var_name} = ${new_value}/" "$tfvars_file"
  else
    echo "${var_name} = ${new_value}" >> "$tfvars_file"
  fi
}

# Function to extract company names from tfvars
extract_company_names() {
  local tfvars_file=$1
  # Extract lines containing "name =" within the company_names block
  grep -A 50 "company_names = {" "$tfvars_file" | grep "name = " | sed 's/.*name = "\(.*\)".*/\1/'
}

TFVARS_FILE="databricks-workspace.tfvars"

echo "Checking Azure resources..."

# Check if resource group exists
if az group exists -n "rg-kineo-analytics" 2>/dev/null; then
  update_tfvar_bool "create_resource_group" "false" "$TFVARS_FILE"
  echo "Resource group already exists, setting create_resource_group to false"
else
  echo "Either resource group doesn't exist or we don't have permission to check"
  update_tfvar_bool "create_resource_group" "true" "$TFVARS_FILE"
  echo "Setting create_resource_group to true"
fi

# Check if Databricks workspace exists
if az databricks workspace list --resource-group "rg-kineo-analytics" --query "[?name=='databricks-kineo-analytics']" 2>/dev/null | grep -q "name"; then
  update_tfvar_bool "create_databricks_workspace" "false" "$TFVARS_FILE"
  echo "Databricks workspace already exists, setting create_databricks_workspace to false"
else
  echo "Either Databricks workspace doesn't exist or we don't have permission to check"
  update_tfvar_bool "create_databricks_workspace" "true" "$TFVARS_FILE"
  echo "Setting create_databricks_workspace to true"
fi

# For the catalogs, we'll set to false initially
# The actual checking of catalogs should happen in a separate step after the workspace
# is created and the Databricks CLI is configured with the workspace URL
update_tfvar_bool "create_databricks_catalogs" "false" "$TFVARS_FILE"
echo "Setting create_databricks_catalogs to false - catalog existence will be checked after workspace creation"

echo "Updated databricks-workspace.tfvars file:"
cat "$TFVARS_FILE" 