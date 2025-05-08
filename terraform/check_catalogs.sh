#!/bin/bash

# Script to check if catalogs exist and update databricks-workspace.tfvars accordingly
# This script should be run after the workspace is created and Databricks CLI is configured

set -e  # Exit immediately if a command fails

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

# Function to get map of company keys to names
get_company_name_map() {
  local tfvars_file=$1
  local start_line=$(grep -n "company_names = {" "$tfvars_file" | cut -d: -f1)
  
  if [ -z "$start_line" ]; then
    return 1
  fi
  
  # Process file to extract key-name pairs
  awk -v start=$start_line '
    NR >= start {
      if ($0 ~ /^}/) { exit; }
      if ($0 ~ /company_[a-z0-9_]* = {/) {
        key = $1;
        in_block = 1;
      }
      else if (in_block && $0 ~ /name = /) {
        gsub(/name = "|"/, "", $0);
        sub(/^[ \t]*/, "", $0);
        print key " " $0;
        in_block = 0;
      }
    }
  ' "$tfvars_file"
}

# Function to check catalog existence
check_catalog_existence() {
  local catalog_name=$1
  local catalog_list=$2
  
  # Check for an exact match of the catalog name in the JSON output
  if echo "$catalog_list" | grep -q "\"name\": \"$catalog_name\""; then
    echo "Catalog '$catalog_name' already exists"
    return 0
  else
    echo "Catalog '$catalog_name' not found, will create it"
    return 1
  fi
}

# Main execution starts here
TFVARS_FILE="databricks-workspace.tfvars"

echo "Checking for existing catalogs..."

# Backup original tfvars file
cp "$TFVARS_FILE" "${TFVARS_FILE}.bak"
echo "Backed up original tfvars file to ${TFVARS_FILE}.bak"

# Check if the Databricks CLI is properly configured
if databricks version &>/dev/null; then
  echo "New Databricks CLI detected"
elif ! grep -q "host" ~/.databrickscfg || ! grep -q "token" ~/.databrickscfg; then
  echo "ERROR: Databricks CLI not properly configured. Run configure_databricks_cli.sh first."
  exit 1
fi

# Get a list of all existing catalogs
echo "Getting catalog list..."

# Try catalog list commands in order of preference
existing_catalogs=""
found_catalogs=0

if databricks catalog list -o JSON 2>/dev/null; then
  echo "Using 'catalog list' command with JSON output"
  existing_catalogs=$(databricks catalog list -o JSON 2>/dev/null)
  found_catalogs=1
elif databricks catalogs list -o JSON 2>/dev/null; then 
  echo "Using 'catalogs list' command with JSON output"
  existing_catalogs=$(databricks catalogs list -o JSON 2>/dev/null)
  found_catalogs=1
elif databricks catalog list 2>/dev/null; then
  echo "Using plain 'catalog list' command"
  existing_catalogs=$(databricks catalog list 2>/dev/null)
  found_catalogs=1
elif databricks catalogs list 2>/dev/null; then
  echo "Using plain 'catalogs list' command"
  existing_catalogs=$(databricks catalogs list 2>/dev/null)
  found_catalogs=1
fi

# If no catalogs were found, assume none exist
if [ $found_catalogs -eq 0 ]; then
  echo "No catalog commands succeeded. Assuming no catalogs exist."
  # Will create all catalogs
  update_tfvar_bool "create_databricks_catalogs" "true" "$TFVARS_FILE"
  echo "Setting create_databricks_catalogs to true to create all catalogs"
  exit 0
fi

# Get company name map (key -> name mapping)
company_map=$(get_company_name_map "$TFVARS_FILE")
if [ -z "$company_map" ]; then
  echo "ERROR: Could not parse company names from tfvars file"
  exit 1
fi

# Create a list of company keys to keep (catalogs that don't exist)
keys_to_keep=()

# Process each company to determine which ones to keep
while read -r line; do
  company_key=$(echo "$line" | awk '{print $1}')
  company_name=$(echo "$line" | awk '{print $2}')
  
  # Check if catalog exists
  if check_catalog_existence "$company_name" "$existing_catalogs"; then
    echo "Skipping $company_key as catalog $company_name already exists"
  else
    echo "Keeping $company_key as catalog $company_name needs to be created"
    keys_to_keep+=("$company_key")
  fi
done <<< "$company_map"

# Use awk to comment out company entries that should be removed
temp_file=$(mktemp)

awk -v keys_to_keep="${keys_to_keep[*]}" '
BEGIN { 
  in_company_block = 0; 
  keep_current_block = 0;
  company_names_open = 0;
  brace_count = 0;
  split(keys_to_keep, keep_keys);
  for (i in keep_keys) {
    keys[keep_keys[i]] = 1;
  }
}

# Track when we enter company_names block
/^company_names = {/ { 
  company_names_open = 1;
  print;
  next;
}

# Process company blocks within company_names
{
  if (company_names_open) {
    # Detect start of a company block
    if ($0 ~ /^[[:space:]]*company_[a-zA-Z0-9_]+ =/) {
      # Extract the company key
      key = $1;
      in_company_block = 1;
      # Check if this company should be kept
      keep_current_block = (key in keys);
      brace_count = 0;
    }
    
    # If in a block, count braces to find the end
    if (in_company_block) {
      # Count opening braces
      if ($0 ~ /{/) brace_count++;
      # Count closing braces
      if ($0 ~ /}/) brace_count--;
      
      # End of block detection
      if (brace_count <= 0 && $0 ~ /}/) {
        in_company_block = 0;
      }
      
      # Only print lines for blocks we want to keep
      if (keep_current_block) {
        print;
      }
    } else {
      # Outside a company block but still in company_names
      if ($0 ~ /^}/) {
        company_names_open = 0;
      }
      print;
    }
  } else {
    # Not in company_names block, print everything
    print;
  }
}
' "$TFVARS_FILE" > "$temp_file"

# Replace original file
mv "$temp_file" "$TFVARS_FILE"

# Check if we have any catalogs to create
if [ ${#keys_to_keep[@]} -gt 0 ]; then
  update_tfvar_bool "create_databricks_catalogs" "true" "$TFVARS_FILE"
else
  update_tfvar_bool "create_databricks_catalogs" "false" "$TFVARS_FILE"
fi

echo "Checking final company_names block:"
grep -A 50 "company_names = {" "$TFVARS_FILE" | grep -v "^--$"

echo "Updated databricks-workspace.tfvars file:"
cat "$TFVARS_FILE"