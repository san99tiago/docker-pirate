#!/bin/bash
# RUN WSADMIN-PYTHON SCRIPTS WITH INPUT PARAMETERS FOR WAS CONFIGURATIONS
# Santiago Garcia Arango
# Inspired by IBM-WAS-dev (https://github.com/WASdev/ci.docker.websphere-traditional)
# ------------------------------------------------------------------------------
# This is my own cool simple script to run my Jython scripts with arguments passed
# PARAM_1 --> PATH_TO_FILE (Example: "/work/my_config/configure_jvm_heap_size.py")
# PARAM_2 --> ARGUMENT/ARGUMENTS (Example: "256 1024")
# COMMAND --> /work/run_python_script_with_params.sh PARAM_1 PARAM_2

PATH_TO_FILE=$1
PARAMS="${@:2}"

start_server()
{
  echo "Starting server ..................."
  /opt/IBM/WebSphere/AppServer/profiles/$PROFILE_NAME/bin/startServer.sh $SERVER_NAME
}

stop_server()
{
  echo "Stopping server ..................."
  kill -s INT $PID
}

echo "Setting Password"
/work/set_password.sh
start_server
PID=$(ps -C java -o pid= | tr -d " ")

echo "Preparing to run my cool Jython scripts with params"
export JYTHON_SCRIPT_LOGS=/tmp/jython_scripts.log
{
  ADMIN_USER_NAME=${ADMIN_USER_NAME:-"wsadmin"}
  WSADMIN_PASS=$(cat /tmp/PASSWORD)
  /opt/IBM/WebSphere/AppServer/bin/wsadmin.sh -user $ADMIN_USER_NAME -password $WSADMIN_PASS -lang jython -f $PATH_TO_FILE $PARAMS
} | tee -a "$JYTHON_SCRIPT_LOGS"

stop_server
find /opt/IBM -user was ! -perm -g=w -print0 | xargs -0 -r chmod g+w
find /opt/IBM -type d -user was ! -perm -g=x -print0 | xargs -0 -r chmod g+x
