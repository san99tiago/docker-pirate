FROM websphere-liberty:21.0.0.6-kernel-java8-ibmjava

ENV VERBOSE=true

COPY --chown=1001:0 server.xml /config/
COPY --chown=1001:0 jvm.options /config/
COPY --chown=1001:0 wmq /config/

RUN configure.sh
