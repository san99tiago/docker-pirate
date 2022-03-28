FROM ibmcom/mq:9.2.4.0-r1

LABEL maintainer="Santiago Garcia Arango [san99tiago]"

COPY my-custom-init-config.mqsc /etc/mqm/

ENTRYPOINT ["runmqdevserver"]