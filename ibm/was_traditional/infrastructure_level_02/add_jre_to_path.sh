#!/bin/bash
set -x

# Add JRE binaries to path (for executing keytool and other commands easily)
echo "********* Adding JRE bins to path *********"
PATH_TO_JRE_BIN=$(find / -name jre 2>/dev/null)/bin
echo "PATH=$PATH:$PATH_TO_JRE_BIN" >> ~/.bashrc
