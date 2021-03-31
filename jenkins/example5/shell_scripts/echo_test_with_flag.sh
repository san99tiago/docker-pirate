#!/bin/bash

# Argument parameters when executing script
NAME=$1
LASTNAME=$2
SHOW_OUTPUT=$3

# Main script output (to show it in terminal  if activated flag)
if [ "$SHOW_OUTPUT" = "true" ]; then
    echo "Hello $NAME $LASTNAME"
else
    echo "Mark the SHOW_OUTPUT flag to see message"
fi
