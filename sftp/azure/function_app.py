import logging
import azure.functions as func
import paramiko
import os
import stat
import requests

app = func.FunctionApp()

# Databricks Configuration
# Databricks Config
DATABRICKS_INSTANCE = os.environ["DATABRICKS_INSTANCE"]
# @TODO ensure safe practice for databricks token after testing
DATABRICKS_TOKEN = os.environ["DATABRICKS_TOKEN"]
# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

@app.timer_trigger(schedule="0 1 * * *", arg_name="myTimer", run_on_startup=False, use_monitor=False) 

#change the logic to download from sftp and upload to unity catalog
def uploadandpull(myTimer: func.TimerRequest) -> None:
    ...
    local_folder = download_folder_from_azure_sftp()
    logging.info('Attempting upload to unity catalog.')
    upload_folder_to_unity_catalog(local_folder)

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
    
def download_folder_recursive(sftp, remote_folder_path, local_folder_path):
    """
    Recursively download files and folders from remote SFTP server to local.
    """
    os.makedirs(local_folder_path, exist_ok=True)
    
    for item in sftp.listdir(remote_folder_path):
        remote_path = f"{remote_folder_path.rstrip('/')}/{item}"
        local_path = os.path.join(local_folder_path, item)
        
        if stat_is_file(sftp, remote_path):
            logging.info(f"Downloading file {remote_path} to {local_path}")
            sftp.get(remote_path, local_path)
            
        elif stat_is_dir(sftp, remote_path):
            logging.info(f"Entering folder {remote_path}")
            download_folder_recursive(sftp, remote_path, local_path)
            
        else:
            logging.warning(f"Unknown file type for {remote_path}, skipping.")

def download_folder_from_azure_sftp():
    sftp_host = "168.138.10.208"
    sftp_port = 22
    sftp_username = "sftpuser"
    sftp_password = "12345"
    
    remote_folder_path = "/home/sftpuser/csv_files"
    local_folder_path = "/tmp/csv/"
    
    try:
        logging.info("Connecting to SFTP server...")
        
        # Connect using Transport
        transport = paramiko.Transport((sftp_host, sftp_port))
        transport.connect(username=sftp_username, password=sftp_password)
        
        sftp = paramiko.SFTPClient.from_transport(transport)
        
        logging.info("Connection established. Starting recursive download...")
        
        download_folder_recursive(sftp, remote_folder_path, local_folder_path)
        
        sftp.close()
        transport.close()
        
        logging.info(f"All files successfully downloaded to {local_folder_path}")
        
        return local_folder_path
    
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

    upload_url = f"{DATABRICKS_INSTANCE}/api/2.0/fs/files{unity_catalog_path}"
    
    with open(local_file_path, "rb") as f:
        file_data = f.read()

    response = requests.put(upload_url, headers=headers, data=file_data)

    # 204 is success and returns nothing according to REST API docs (likely to change)
    if response.status_code == 204:
        logging.info(f"Successfully uploaded {local_file_path} to {unity_catalog_path}")
    else:
        logging.info(f"Failed to upload file. Status code: {response.status_code}")
        print("Error:", response.text)

# def upload_folder_to_unity_catalog(local_folder_path, unity_catalog_folder_path):
#     """
#     Upload all files from a local folder to Unity Catalog recursively.
#     """
#     for root, dirs, files in os.walk(local_folder_path):
#         # for filename in files:
#         #     local_file = os.path.join(root, filename)
#         #     relative_path = os.path.relpath(local_file, local_folder_path)
#         #     unity_catalog_file_path = f"{unity_catalog_folder_path.rstrip('/')}/{relative_path.replace(os.sep, '/')}"
#         #     upload_file_to_unity_catalog(local_file, unity_catalog_file_path)
#         for file in files:
#             local_file_path = os.path.join(root, file)
#             filename = os.path.basename(file)
#             unity_catalog_file_path = f"{unity_catalog_folder_path.rstrip('/')}/{filename}"
#             upload_file_to_unity_catalog(local_file_path, unity_catalog_file_path)

def upload_folder_to_unity_catalog(local_folder_path):
    """
    Upload files from local folder to Unity Catalog, each company to its own catalog/schema/volume.
    Assumes files are under subfolders like /company_a/file.csv
    """
    for root, dirs, files in os.walk(local_folder_path):
        for file in files:
            local_file_path = os.path.join(root, file)
            relative_path = os.path.relpath(local_file_path, local_folder_path)
            parts = relative_path.split(os.sep)

            # Skip if structure is unexpected
            if len(parts) < 2:
                logging.warning(f"Skipping {relative_path}, unexpected folder structure.")
                continue

            company = parts[0]
            filename = parts[-1]

            # 👇 dynamically construct catalog/schema/volume
            unity_catalog_folder_path = f"/Volumes/{company}/raw_data/{company}_data"
            unity_catalog_file_path = f"{unity_catalog_folder_path}/{filename}"

            upload_file_to_unity_catalog(local_file_path, unity_catalog_file_path)

# For local testing purpose
# class MockTimerRequest:
#     def __init__(self, past_due=False):
#         self.past_due = past_due

# if __name__ == "__main__":
#     logging.info("Running local test of upload process...")
#     uploadandpull(MockTimerRequest(past_due=False))