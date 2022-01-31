# WSADMIN SCRIPT TO CREATE A USER WITH SPECIFIC ROLE FOR IBM WAS CONSOLE
# Santiago Garcia Arango
# Command:
# wsadmin.sh -lang jython -f /tmp/test.py "was_monitor" "1234" "monitor" "WAS" "MONITOR"

import sys
import os
import re

if(len(sys.argv) < 5):
    print("\n***** This script will be skipped because it expects more arguments *****")
    os._exit()

user_id = sys.argv[0]  # Unique ID for the user that will be created [was_monitor]
user_password = sys.argv[1]  # Specifies the password for the user [1234]
user_role = sys.argv[2]  # Specifies the role of the IBM WAS console for the user [monitor]
user_first_name = sys.argv[3]  # Specifies the first name or given name of the user
user_last_name = sys.argv[4]  # Specifies the last name or family name of the user


# Create the user that will be mapped to its "monitor" configuration below
try:
    print("\n***** Creating/validating user {} *****".format(user_id))
    print(AdminTask.createUser('[-uid ' + user_id + ' -password ' + user_password + ' -confirmPassword ' + user_password + ' -cn ' + user_first_name + ' -sn ' + user_last_name + ']'))
    AdminConfig.save()
except:
    pass

print("\n***** Showing Users and Authorizations before mapping *****")
current_auth_users = AdminTask.listUserIDsOfAuthorizationGroup()
print(current_auth_users)
role_already_attached = re.findall(user_role + "=\[" + user_id + "\]", current_auth_users)
if(len(role_already_attached) > 0):
    print("\n***** The user {} already has role {} *****".format(user_id, user_role))
else:
    # Map the created user to the "monitor" role in the 0=defaultWIMFileBasedRealm
    print("\n***** Mapping user {} to role {} *****".format(user_id, user_role))
    AdminTask.mapUsersToAdminRole('[-accessids [user:defaultWIMFileBasedRealm/uid=' + user_id + ',o=defaultWIMFileBasedRealm ] -userids [' + user_id + ' ] -roleName ' + user_role + ']')
    AdminConfig.save()

print("\n***** Showing Users and Authorizations after mapping *****")
current_auth_users = AdminTask.listUserIDsOfAuthorizationGroup()
print(current_auth_users)
