#!/bin/bash

# Script to configure Databricks CLI with the workspace URL and authenticate

# Resource group and workspace name
RESOURCE_GROUP="rg-kineo-analytics"
WORKSPACE_NAME="databricks-kineo-analytics"

# Ensure ~/.databricks directory exists
mkdir -p ~/.databricks

# Check if the workspace exists
if ! az databricks workspace list --resource-group "$RESOURCE_GROUP" --query "[?name=='$WORKSPACE_NAME']" 2>/dev/null | grep -q "name"; then
  echo "Workspace doesn't exist yet. Please create it first."
  exit 1
fi

# Get the workspace URL
WORKSPACE_URL=$(az databricks workspace show --resource-group "$RESOURCE_GROUP" --name "$WORKSPACE_NAME" --query "workspaceUrl" -o tsv)

if [ -z "$WORKSPACE_URL" ]; then
  echo "Failed to get workspace URL."
  exit 1
fi

echo "Workspace URL: $WORKSPACE_URL"

# Check for token - use DATABRICKS_TOKEN_NEW from environment if available
if [ -z "$DATABRICKS_TOKEN_NEW" ]; then
  echo "ERROR: DATABRICKS_TOKEN_NEW environment variable is not set."
  echo "Please set it or manually add the token to ~/.databrickscfg"
  exit 1
fi

# Configure Databricks CLI
# The new CLI uses a different configuration method
databricks configure --host "https://$WORKSPACE_URL" --token "$DATABRICKS_TOKEN_NEW"

if [ $? -ne 0 ]; then
  # Fallback to the legacy configuration method if the new method fails
  echo "Using legacy configuration method..."
  echo "[DEFAULT]" > ~/.databrickscfg
  echo "host = https://$WORKSPACE_URL" >> ~/.databrickscfg
  echo "token = $DATABRICKS_TOKEN_NEW" >> ~/.databrickscfg
fi

# Set environment variables for terraform provider
export DATABRICKS_HOST="https://$WORKSPACE_URL"

echo "Databricks CLI configuration:"
databricks configure --profile-info || cat ~/.databrickscfg

echo "Testing Databricks CLI connection..."

# Test connection - the new CLI has different commands
if databricks workspace ls 2>/dev/null; then
  echo "Successfully connected to Databricks workspace."
elif databricks fs ls 2>/dev/null; then
  echo "Successfully connected to Databricks workspace using filesystem command."
elif databricks --version 2>/dev/null; then
  echo "Databricks CLI is working, but needs further configuration."
else
  echo "Failed to connect to Databricks workspace."
  echo "Available commands:"
  databricks --help
  exit 1
fi 