# WSADMIN SCRIPT TO CONFIGURE JVM HEAP SIZE
# Santiago Garcia Arango
# Command:
# wsadmin.sh -lang jython -f /tmp/test.py <min_heap> <max_heap>

import sys
import os

if(len(sys.argv) < 2):
    print("\n***** This script will be skipped because it expects more arguments *****")
    os._exit()

node_name=AdminTask.listNodes()
server_name=AdminTask.listServers('[-serverType APPLICATION_SERVER ]').split("(")[0]

min_heap = sys.argv[0]  # Get first param of minHeapSize
max_heap = sys.argv[1]  # Get first param of maxHeapSize

# First of all, lets list the properties before the change
print("\n***** Showing JVM properties before update *****")
print(AdminTask.showJVMProperties('[-serverName ' + server_name + ' -nodeName ' + node_name + ']'))

# Change properties based on minHeap and maxHeap
print("\n***** Changing JVM properties *****")
print(AdminTask.setJVMProperties('[-nodeName ' + node_name + ' -serverName ' + server_name + ' -verboseModeClass false -verboseModeGarbageCollection true -verboseModeJNI false -initialHeapSize ' + min_heap + ' -maximumHeapSize ' + max_heap + ' -runHProf false -hprofArguments -debugMode false -debugArgs "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=7777" -executableJarFileName -genericJvmArguments "-Xnoloa" -disableJIT false]'))

print("\n***** Showing JVM properties after update *****")
print(AdminTask.showJVMProperties('[-serverName ' + server_name + ' -nodeName ' + node_name + ']'))

AdminConfig.save()
