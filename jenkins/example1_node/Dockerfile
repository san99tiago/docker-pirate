FROM jenkins/jenkins:lts

USER root

# 1. Instalar dependencias básicas
RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 2. Instalar Node.js (Versión 18 o 20 es mejor que la 12 para este proyecto)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# 3. Instalar el CLI de Docker de forma correcta
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && apt-get install -y docker-ce-cli

# 4. Dar permisos al usuario jenkins
RUN usermod -a -G docker jenkins

USER jenkins