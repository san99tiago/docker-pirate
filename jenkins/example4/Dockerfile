FROM jenkins/jenkins:lts

USER root

# Get custom nodejs install (using curl as tool)
RUN apt-get install -y curl \
    && curl -L https://deb.nodesource.com/setup_12.x | bash - \
    && apt-get install -y nodejs \
    && curl -L https://www.npmjs.com/install.sh | sh

USER jenkins
