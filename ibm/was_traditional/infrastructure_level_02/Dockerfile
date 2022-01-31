FROM ibmcom/websphere-traditional:latest

LABEL maintainer="Santiago Garcia Arango [san99tiago]"

# Add extra logging configuration
ENV ENABLE_BASIC_LOGGING=true

# Add JRE to path (to use keytool easily)
COPY --chown=was:root add_jre_to_path.sh /tmp/add_jre_to_path.sh
RUN /tmp/add_jre_to_path.sh

# Add config files for WAS
RUN mkdir -p /work/my_config
COPY --chown=was:root ["run_python_script_with_params.sh", "/work/my_config/"]
COPY --chown=was:root ["add_custom_properties_web_container.py", "/work/my_config/"]
COPY --chown=was:root ["configure_jvm_heap_size.py", "/work/my_config/"]
COPY --chown=was:root ["create_user_and_role_in_was_console.py", "/work/my_config/"]

# We can run the configure directly to the Jython scripts (when no params are needed)
RUN /work/configure.sh /work/my_config/add_custom_properties_web_container.py

# We run our own wsadmin scripts when additional parameters are required (own development)
RUN /work/my_config/run_python_script_with_params.sh /work/my_config/configure_jvm_heap_size.py "256" "1024"
RUN /work/my_config/run_python_script_with_params.sh /work/my_config/create_user_and_role_in_was_console.py "was_monitor" "1234" "monitor" "WAS" "MONITOR"

# We end with the general configure (see IBM WAS Dockerhub/GitHub documentation)
RUN /work/configure.sh
