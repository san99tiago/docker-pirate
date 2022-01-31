# WSADMIN SCRIPT TO SHOW USEFUL ADMINTASK COMMANDS AND HELP TOWARDS THEM
# Santiago Garcia Arango
# Command:
# wsadmin.sh -lang jython -f /tmp/test.py

print("***** Showing AdminTask help *****")
print(AdminTask.help())

print("***** Showing AdminTask commands *****")
print(AdminTask.help("-commands"))

print("***** Showing AdminTask commands with <*something*> pattern *****")
print(AdminTask.help("-commands", "*server*"))
print(AdminTask.help("-commands", "*jvm*"))
print(AdminTask.help("-commands", "*user*"))

print("***** Showing AdminTask command groups *****")
print(AdminTask.help("-commandGroups"))

print("***** Showing AdminTask specific command help (some examples) *****")
print(AdminTask.help("listNodes"))
print(AdminTask.help("listServers"))
print(AdminTask.help("showServerInfo"))
print(AdminTask.help("setJVMProperties"))
print(AdminTask.help("showJVMProperties"))
print(AdminTask.help("createAuthDataEntry"))
print(AdminTask.help("modifyAuthDataEntry"))
print(AdminTask.help("modifyWMQQueue"))
print(AdminTask.help("createWMQQueue"))
print(AdminTask.help("listUserIDsOfAuthorizationGroup"))
print(AdminTask.help("listAuditUserIDsOfAuthorizationGroup"))
print(AdminTask.help("createUser"))

