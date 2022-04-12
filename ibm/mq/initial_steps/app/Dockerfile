FROM openjdk:8

LABEL maintainer="Santiago Garcia Arango [san99tiago]"

RUN mkdir -p /MQClient

RUN  cd /MQClient &&\
  curl -o com.ibm.mq.allclient-9.1.4.0.jar https://repo1.maven.org/maven2/com/ibm/mq/com.ibm.mq.allclient/9.1.4.0/com.ibm.mq.allclient-9.1.4.0.jar &&\
  curl -o javax.jms-api-2.0.1.jar https://repo1.maven.org/maven2/javax/jms/javax.jms-api/2.0.1/javax.jms-api-2.0.1.jar

RUN mkdir -p /MQClient/com/ibm/mq/samples
COPY JmsPutGet.java /MQClient/com/ibm/mq/samples/jms/

RUN  cd /MQClient &&\
  javac -cp ./com.ibm.mq.allclient-9.1.4.0.jar:./javax.jms-api-2.0.1.jar com/ibm/mq/samples/jms/JmsPutGet.java

# CMD [ "sleep", "infinity" ]
CMD ["java", "-cp", "/MQClient/com.ibm.mq.allclient-9.1.4.0.jar:/MQClient/javax.jms-api-2.0.1.jar:/MQClient", "com.ibm.mq.samples.jms.JmsPutGet"]
