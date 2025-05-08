/*
Databricks provider and Databricks Jobs 
*/


# List of notebooks to run, this is for git action trigger
# Every time a new notebook is added, it will be added to the list
# And a new job will be created (by Github Actions)

variable "create_transform_rawdata_job" {
  type    = bool
  default = false
}

variable "notebook_path" {
  type    = set(string)
  default = []
  description = "Set of notebook paths to create jobs for"
}

# Function to format current timestamp in YYYY-MM-DD-HHmm format
locals {
  # Format timestamp as YYYY-MM-DD-HHmm
  formatted_timestamp = formatdate("YYYYMMDD-hhmm", timestamp())
}

# Create a job for etl
resource "databricks_job" "run_transform_rawdata" {
  for_each = var.notebook_path
  
  name = "run-notebook-${split("/", each.value)[length(split("/", each.value)) - 1]}-${local.formatted_timestamp}"
  
  job_cluster {
    job_cluster_key = "jc-1"
    new_cluster {
      num_workers   = 1
      spark_version = "15.4.x-scala2.12"
      node_type_id  = "Standard_F8s"
    }
  }

  task {
    task_key = "${split("/", each.value)[length(split("/", each.value)) - 1]}"
    job_cluster_key = "jc-1"
    notebook_task {
      notebook_path = each.value
    }
    max_retries = 1
    timeout_seconds = 3600
  }
  
  # Force update existing job rather than recreate
  lifecycle {
    ignore_changes = [
      task[0].notebook_task[0].base_parameters
    ]
  }
}

output "databricks_job_ids" {
  value = var.create_transform_rawdata_job ? { for path, job in databricks_job.run_transform_rawdata : path => job.id } : {}
}

