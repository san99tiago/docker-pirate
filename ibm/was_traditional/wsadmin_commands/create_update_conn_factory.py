# WSADMIN SCRIPT TO CREATE OR UPDATE A CONNECTION FACTORY (DATA-AUTH MUST BE ALREADY-CREATED)
# Santiago Garcia Arango
# Command:
# wsadmin.sh -lang jython -f /tmp/test.py conn_factory_name conn_factory_jndi_name queue_manager service_channel qmgr_hostname qmgr_port data_auth_alias

import sys

conn_factory_name = sys.argv[0]
conn_factory_jndi_name = sys.argv[1]
queue_manager = sys.argv[2]
service_channel = sys.argv[3]
qmgr_hostname = sys.argv[4]
qmgr_port = sys.argv[5]
data_auth_alias = sys.argv[6]

def is_conn_factory_created(conn_factory_name):
    """
    Function to validate if a connection factory is created.
    :param conn_factory_name: string of the name of the applications to check.
    :returns: string "Created" or "Not Created"
    """
    conn_factories_list = AdminTask.listWMQConnectionFactories(AdminConfig.getid("/Cell:AWSCell01/")).splitlines()

    for con in conn_factories_list:
        if con.startswith(conn_factory_name + "("):
            return "Created"
    return "Not Created"


# Create or update objects for connection factories
if (is_conn_factory_created(conn_factory_name) == "Created"):
    print("AQUI SE ACTUALIZA CONNECTION FACTORY")

    conn_factories_list = AdminTask.listWMQConnectionFactories(AdminConfig.getid("/Cell:AWSCell01/")).splitlines()
    for con in conn_factories_list:
        if con.startswith(conn_factory_name + "("):
            conn_factory_to_modify = con
            print("Connection factory being modified:")
            print(conn_factory_to_modify)

    AdminTask.modifyWMQConnectionFactory(conn_factory_to_modify, '[-name ' + conn_factory_name + ' -jndiName ' + conn_factory_jndi_name + ' -description "Connection factory for HDC" -qmgrName ' + queue_manager + ' -wmqTransportType BINDINGS_THEN_CLIENT -qmgrHostname ' + qmgr_hostname + ' -qmgrPortNumber ' + qmgr_port + ' -qmgrSvrconnChannel ' + service_channel + ' -sslType CENTRAL -clientId -providerVersion -mappingAlias DefaultPrincipalMapping -containerAuthAlias AWSPFNA01/' + data_auth_alias + ' -componentAuthAlias -xaRecoveryAuthAlias AWSPFNA01/' + data_auth_alias + ' -support2PCProtocol true -clonedSubs DISABLED ]') 
else:
    AdminTask.createWMQConnectionFactory('"WebSphere MQ JMS Provider(cells/AWSCell01|resources.xml#builtin_mqprovider)"', '[-type CF -name ' + conn_factory_name + ' -jndiName ' + conn_factory_jndi_name + ' -description "Connection factory for HDC" -qmgrName ' + queue_manager + ' -wmqTransportType BINDINGS_THEN_CLIENT -qmgrSvrconnChannel ' + service_channel + ' -qmgrHostname ' + qmgr_hostname + ' -qmgrPortNumber ' + qmgr_port + ' ]')
    AdminConfig.save()

    conn_factories_list = AdminTask.listWMQConnectionFactories(AdminConfig.getid("/Cell:AWSCell01/")).splitlines()
    for con in conn_factories_list:
        if con.startswith(conn_factory_name + "("):
            conn_factory_to_modify = con

    AdminTask.modifyWMQConnectionFactory(conn_factory_to_modify, '[-name ' + conn_factory_name + ' -jndiName ' + conn_factory_jndi_name + ' -description "Connection factory for HDC" -qmgrName ' + queue_manager + ' -wmqTransportType BINDINGS_THEN_CLIENT -qmgrHostname ' + qmgr_hostname + ' -qmgrPortNumber ' + qmgr_port + ' -qmgrSvrconnChannel ' + service_channel + ' -sslType CENTRAL -clientId -providerVersion -mappingAlias DefaultPrincipalMapping -containerAuthAlias AWSPFNA01/' + data_auth_alias + ' -componentAuthAlias -xaRecoveryAuthAlias AWSPFNA01/' + data_auth_alias + ' -support2PCProtocol true -clonedSubs DISABLED ]') 
AdminConfig.save()
