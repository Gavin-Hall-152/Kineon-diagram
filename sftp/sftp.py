import os
import stat
import logging
import requests
import paramiko
from collections import defaultdict

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Databricks Configuration
# Databricks Config
DATABRICKS_INSTANCE = os.environ["DATABRICKS_INSTANCE"]
# @TODO ensure safe practice for databricks token after testing
DATABRICKS_TOKEN = os.environ["DATABRICKS_TOKEN"]

def stat_is_file(sftp, path):
    """
    Check if the given remote path is a file.
    """
    try:
        return stat.S_ISREG(sftp.stat(path).st_mode)
    except IOError:
        return False
    
def stat_is_dir(sftp, path):
    """
    Check if the given remote path is a directory.
    """
    try:
        return stat.S_ISDIR(sftp.stat(path).st_mode)
    except IOError:
        return False
    
def download_folder_recursive(sftp, remote_folder_path, local_folder_path, base_path=""):
    downloaded_files = []
    os.makedirs(local_folder_path, exist_ok=True)
    
    for item in sftp.listdir(remote_folder_path):
        remote_path = f"{remote_folder_path.rstrip('/')}/{item}"
        local_path = os.path.join(local_folder_path, item)
        rel_path = os.path.join(base_path, item)
        
        if stat_is_file(sftp, remote_path):
            logging.info(f"Downloading file {remote_path} to {local_path}")
            sftp.get(remote_path, local_path)
            downloaded_files.append(rel_path)
        elif stat_is_dir(sftp, remote_path):
            logging.info(f"Entering folder {remote_path}")
            downloaded_files += download_folder_recursive(sftp, remote_path, local_path, rel_path)
        else:
            logging.warning(f"Unknown file type for {remote_path}, skipping.")
    
    return downloaded_files

def download_folder_from_azure_sftp():
    sftp_host = "168.138.10.208"
    sftp_port = 22
    sftp_username = "sftpuser"
    sftp_password = "12345"

    remote_folder_path = "/home/sftpuser/csv_files"
    local_folder_path = "/tmp/csv/"

    try:
        logging.info("Connecting to SFTP server...")
        transport = paramiko.Transport((sftp_host, sftp_port))
        transport.connect(username=sftp_username, password=sftp_password)
        sftp = paramiko.SFTPClient.from_transport(transport)

        logging.info("Connection established. Starting recursive download...")
        downloaded_files = download_folder_recursive(sftp, remote_folder_path, local_folder_path)

        sftp.close()
        transport.close()

        logging.info(f"All files successfully downloaded to {local_folder_path}")
        return local_folder_path, downloaded_files

    except Exception as e:
        logging.error(f"Error during SFTP folder download: {e}")
        raise

# Testing function to check authorization
def test_connection():
    headers = {
        "Authorization": f"Bearer {DATABRICKS_TOKEN}"
    }

    # Test by listing clusters (can also use other endpoints like /api/2.0/jobs/list)
    response = requests.get(f"{DATABRICKS_INSTANCE}/api/2.0/clusters/list", headers=headers)

    if response.status_code == 200:
        print("Successfully connected to Databricks!")
        print("Clusters List:", response.json())
    else:
        print(f"Failed to connect to Databricks. Status code: {response.status_code}")
        print("Error:", response.text)

def upload_file_to_unity_catalog(local_file_path, unity_catalog_path):
    """
    Upload a file to Unity Catalog using the /api/2.0/fs/files endpoint.
    The file contents are sent as raw bytes in the request body.
    """
    headers = {
        "Authorization": f"Bearer {DATABRICKS_TOKEN}"
    }

    upload_url = f"{DATABRICKS_INSTANCE}/api/2.0/fs/files{unity_catalog_path}?overwrite=true"
    
    with open(local_file_path, "rb") as f:
        file_data = f.read()

    response = requests.put(upload_url, headers=headers, data=file_data)

    # 204 is success and returns nothing according to REST API docs (likely to change)
    if response.status_code == 204:
        logging.info(f"Successfully uploaded {local_file_path} to {unity_catalog_path}")
    else:
        logging.error(
                f"Failed to upload file: {local_file_path} "
                f"to Unity path: {unity_catalog_path}. "
                f"Status code: {response.status_code}, Error: {response.text}"
            )

def upload_folder_to_unity_catalog(local_folder_path, downloaded_files):
    company_files = defaultdict(list)

    # Group files by company folder (first-level folder in downloaded path)
    for rel_path in downloaded_files:
        parts = rel_path.split(os.sep)
        if len(parts) >= 2:
            company = parts[0]
            company_files[company].append(rel_path)
        else:
            logging.warning(f"Skipping file with unexpected path structure: {rel_path}")
    
    for company, files in company_files.items():
        unity_catalog_base_path = f"/Volumes/{company}/raw_data/{company}_data"
        for file in files:
            local_file_path = os.path.join(local_folder_path, file)
            unity_catalog_file_path = f"{unity_catalog_base_path}/{file.replace(os.sep, '/')}"
            upload_file_to_unity_catalog(local_file_path, unity_catalog_file_path)
        
if __name__ == "__main__":
    local_folder, downloaded_files = download_folder_from_azure_sftp()
    logging.info('Attempting upload to Unity Catalog per company.')
    upload_folder_to_unity_catalog(local_folder, downloaded_files)