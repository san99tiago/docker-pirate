# WSADMIN SCRIPT TO CREATE OR MODIFY AN AUTH-DATA-ENTRY FOR J2C SECURITY
# Santiago Garcia Arango
# Command:
# wsadmin.sh -lang jython -f /tmp/test.py auth_data_name

# Imports
import sys
import re

# Variables
data_auth_alias = sys.argv[0]  # auth_data_name


def is_auth_data_created(data_auth_alias):
    """
    Function to validate if a J2C authentication data is created.
    :param data_auth_alias: string of the name of the applications to check.
    :returns: string "Created" or "Not Created"
    """
    users = AdminTask.listAuthDataEntries().splitlines()

    for user in users:
        found_alias = re.search(".+alias (\w.+)\] \[user.+", user)
        if (found_alias.group(1) == "AWSPFNA01/" + data_auth_alias):
            return "Created"
    return "Not Created"

# Create or update object for J2C auth data
if (is_auth_data_created(data_auth_alias) == "Created"):
    print("Modifying auth_data_entry")
    AdminTask.modifyAuthDataEntry('[-alias ' + 'AWSPFNA01/' + data_auth_alias + ' -user ' + data_auth_alias + ' -password ' + data_auth_alias + ' -description "User and Password for MQ connection for HDC" ]') 
else:
    print("Creating auth_data_entry")
    AdminTask.createAuthDataEntry('[-alias ' + data_auth_alias + ' -user ' + data_auth_alias + ' -password ' + data_auth_alias + ' -description \"User and Password for MQ connection for HDC\" ]') 

AdminConfig.save()