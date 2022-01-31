# WSADMIN SCRIPT TO CREATE OR UPDATE CUSTOM PROPERTIES IN WEB-CONTAINER
# Santiago Garcia Arango
# Command:
# wsadmin.sh -lang jython -f /tmp/test.py

server_id=AdminTask.listServers('[-serverType APPLICATION_SERVER ]')
web_container_id = AdminConfig.list('WebContainer', server_id)  # Get web_container_id based on server_id already found
properties = AdminConfig.list('Property', web_container_id).splitlines()  # Get Custom Properties of WebContainer
for property in properties:
    if (property.startswith("com.ibm.ws.webcontainer.extractHostHeaderPort(")):
        print("Removing existing 'com.ibm.ws.webcontainer.extractHostHeaderPort' property from Custom Properties...")
        AdminConfig.remove(property)
    if (property.startswith("trusthostheaderport(")):
        print("Removing existing 'trusthostheaderport' property from Custom Properties...")
        AdminConfig.remove(property)
    if (property.startswith("com.ibm.ws.webcontainer.disablexPoweredBy(")):
        print("Removing existing 'com.ibm.ws.webcontainer.disablexPoweredBy' property from Custom Properties...")
        AdminConfig.remove(property)
print("Creating 'com.ibm.ws.webcontainer.extractHostHeaderPort' property in Custom Properties...")
AdminConfig.create('Property', web_container_id, '[[validationExpression ""] [name "com.ibm.ws.webcontainer.extractHostHeaderPort"] [description "Property to keep port after response"] [value "true"] [required "false"]]')
print("Creating 'trusthostheaderport' property in Custom Properties...")
AdminConfig.create('Property', web_container_id, '[[validationExpression ""] [name "trusthostheaderport"] [description "Property to keep port after response"] [value "true"] [required "false"]]')
print("Creating 'com.ibm.ws.webcontainer.disablexPoweredBy' property in Custom Properties...")
AdminConfig.create('Property', web_container_id, '[[validationExpression ""] [name "com.ibm.ws.webcontainer.disablexPoweredBy"] [description "Property to disable X-Powered-By header in response"] [value "true"] [required "false"]]')

AdminConfig.save()
