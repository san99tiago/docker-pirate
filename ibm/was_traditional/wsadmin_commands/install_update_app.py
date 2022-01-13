# WSADMIN SCRIPT TO INSTALL, OR UPDATE A WAR, EAR or JAR APP IN WAS FP
# Santiago Garcia Arango
# Command:
# wsadmin.sh -lang jython -f /tmp/test.py ear_path ear_name app_name context_root

import sys

ear_path = sys.argv[0]
ear_name = sys.argv[1]
app_name = sys.argv[2]
context_root = sys.argv[3]


def is_app_installed(app_name):
    """
    Function to validate if an application is installed.
    :param app_name: string of the name of the applications to check.
    :returns: string "Installed" or "Not Installed"
    """
    # Get the list of Application installed in server in a list
    app_list = AdminApp.list().splitlines()
    print("Current installed apps are: ", app_list)
    for app in app_list:
        if (app == app_name):
            return "Installed"
    return "Not Installed"


# Update or install application
if (is_app_installed(app_name) == "Installed"):
    print("Updating backend application...")
    AdminApp.update(app_name, 'app', '[ -operation update -contents ' + ear_path + ear_name + ' -nopreCompileJSPs -installed.ear.destination $(APP_INSTALL_ROOT)/AWSCell01 -distributeApp -nouseMetaDataFromBinary -nodeployejb -createMBeansForResources -noreloadEnabled -nodeployws -validateinstall warn -noprocessEmbeddedConfig -filepermission .*\.dll=755#.*\.so=755#.*\.a=755#.*\.sl=755 -noallowDispatchRemoteInclude -noallowServiceRemoteInclude -asyncRequestDispatchType DISABLED -nouseAutoLink -noenableClientModule -clientMode isolated -novalidateSchema -contextroot ' + context_root + ' -MapModulesToServers [[ web ' + ear_name + ',WEB-INF/web.xml WebSphere:cell=AWSCell01,node=AWSPFNA01,server=ASAWS01 ]] -CtxRootForWebMod [[ web ' + ear_name + ',WEB-INF/web.xml ' + context_root + ' ]]]' )
else:
    print("Installing backend application...")
    AdminApp.install(ear_path + ear_name, '[ -nopreCompileJSPs -distributeApp -nouseMetaDataFromBinary -nodeployejb -appname ' + app_name + '_BACK_war' + ' -createMBeansForResources -noreloadEnabled -nodeployws -validateinstall warn -noprocessEmbeddedConfig -filepermission .*\.dll=755#.*\.so=755#.*\.a=755#.*\.sl=755 -noallowDispatchRemoteInclude -noallowServiceRemoteInclude -asyncRequestDispatchType DISABLED -nouseAutoLink -noenableClientModule -clientMode isolated -novalidateSchema -contextroot ' + context_root + ' -MapModulesToServers [[ web ' + ear_name + ',WEB-INF/web.xml WebSphere:cell=AWSCell01,node=AWSPFNA01,server=ASAWS01 ]] -CtxRootForWebMod [[ web ' + ear_name + ',WEB-INF/web.xml ' + context_root + ' ]]]' ) 
    AdminConfig.save()
    AdminControl.invoke('WebSphere:name=ApplicationManager,process=ASAWS01,platform=proxy,node=AWSPFNA01,version=8.5.5.19,type=ApplicationManager,mbeanIdentifier=ApplicationManager,cell=AWSCell01,spec=1.0', 'startApplication', '[' + app_name + '_BACK_war' + ']') 

AdminConfig.save()
