FROM open-liberty:kernel-slim-java8-openj9

ENV VERBOSE=true

COPY --chown=1001:0 server.xml /config/
COPY --chown=1001:0 jvm.options /config/

RUN features.sh
RUN configure.sh
