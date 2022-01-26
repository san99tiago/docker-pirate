FROM ibmcom/websphere-traditional:latest

# Add extra logging configuration
ENV ENABLE_BASIC_LOGGING=true

# Add JRE to path (to use keytool easily)
COPY --chown=was:root add_jre_to_path.sh /tmp/add_jre_to_path.sh
RUN /tmp/add_jre_to_path.sh

# Add config files for WAS
COPY --chown=was:root ["add_custom_properties_web_container.py", "/work/config/"]
RUN /work/configure.sh /work/config/add_custom_properties_web_container.py
