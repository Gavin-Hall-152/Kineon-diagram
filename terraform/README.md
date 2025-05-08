# ⚙️ KIN Analytics Platform – Terraform Infrastructure

This repository contains Terraform configurations to provision cloud infrastructure used in the KIN Analytics project. It automates setup for:

- 🔵 Azure resources
- 🟡 Databricks jobs

---

## 📦 Project Structure

```bash
terraform/
├── main.tf                    # Azure & provider configs
├── databricks.tf              # Databricks job automation
├── oci_sftp.tf                # OCI VM provisioning (SFTP server)
├── variables.tf               # Input variable declarations
├── terraform.tfvars           # 🔒 Secret values (git-ignored)
├── terraform.tfvars.template  # ✅ Safe template to share config structure
├── README.md                  # This file
└── .terraform.lock.hcl        # Provider lockfile
```

---

## 🚀 What Is Terraform?

Terraform is an **Infrastructure-as-Code (IaC)** tool that enables you to define cloud resources (e.g., servers, networks, jobs) in `.tf` files and deploy them using a CLI. It automates provisioning across:

- ☁️ Azure, AWS, GCP
- 🔁 Kubernetes
- 💡 Databricks

---

## ⚙️ Prerequisites

To use this repository locally:

- ✅ [Terraform CLI](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- ✅ [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
- ✅ [Databricks CLI](https://docs.databricks.com/dev-tools/cli/index.html)

---

## 🔐 Secrets Management

All secrets (API keys, credentials, OCIDs) are defined in `terraform.tfvars`, which is git-ignored.

### ✅ Shareable Template

Use `terraform.tfvars.template` to onboard new teammates without exposing secrets.

---

## 🧪 Running Terraform

### 🔧 Setup

```bash
cd terraform/

# Authenticate
az login                         # Azure
databricks configure             # Databricks (interactive)

# Initialize Terraform
terraform init
```

---

### 📊 Plan & Apply Infrastructure

```bash
# Preview resources to be created/updated
terraform plan

# Apply changes using tfvars file
terraform apply -var-file="terraform.tfvars"
```

---

## 📤 Connecting to the SFTP Server

Once the VM is provisioned, connect via:

### 🔑 SSH Access

```bash
ssh -i /path/to/private.pem ubuntu@168.138.10.208
```

### 📁 SFTP Access

#### Option A: Using Key

```bash
sftp -i /path/to/private.pem sftpuser@168.138.10.208
```

#### Option B: Using Password (if enabled)

```bash
sftp sftpuser@168.138.10.208
```

You will be prompted for the password (shared by admin).

#### SFTP Commands

```bash
cd csv_files
put your_data.csv
get exported_file.csv
exit
```

---

## 🧱 Azure + Databricks Setup

### ✅ Azure Resources (Optional)

Example resource definitions (commented out in `main.tf`):

- `azurerm_resource_group`
- `azurerm_databricks_workspace`

You may import them if pre-existing:

```bash
terraform import azurerm_resource_group.rg_name "/subscriptions/.../resourceGroups/<name>"
terraform import azurerm_databricks_workspace.workspace_name "/subscriptions/.../databricks/workspaces/<name>"
```

---

### 🧠 Databricks Job Management

Defined in `databricks.tf`, jobs can be automatically created via:

```bash
terraform apply
```

> Databricks CLI authentication is interactive. Use `databricks configure` beforehand.

---

## 🔁 CI/CD Status (GitHub Actions)

A GitHub Actions workflow is included for future automation of:

- Terraform validation & apply
- Triggering Databricks jobs

🛑 Currently, **Azure CLI login fails in CI**, so local apply is still required.

---

## 🛡️ Security & Collaboration

### ✅ Git Ignore Rules

Sensitive files are excluded in `.gitignore`:

```
terraform/terraform.tfvars
terraform/.terraform/
terraform/terraform.tfstate*
.local/
csv/
```

### 🚫 Do Not Commit

- `.pem` private keys
- `terraform.tfvars` with secrets
- Cloud credentials or tokens

---

## 🧠 Reference

- [Terraform Docs](https://developer.hashicorp.com/terraform/docs)
- [Azure Terraform Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [Databricks Provider](https://registry.terraform.io/providers/databricks/databricks/latest/docs)

---

## ✅ Summary

| Cloud          | Purpose                          | Status |
| -------------- | -------------------------------- | ------ |
| Azure          | Resource group, Databricks infra | ✅     |
| OCI            | SFTP VM (Ubuntu 22.04)           | ✅     |
| GitHub Actions | CI Terraform pipeline            | 🚧     |
| Databricks     | Automated jobs (via TF)          | 🚧     |

---
