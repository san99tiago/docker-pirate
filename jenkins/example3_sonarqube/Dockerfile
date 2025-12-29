# Usamos la imagen oficial LTS de Jenkins como base
FROM jenkins/jenkins:lts

# Cambiamos a root para realizar instalaciones de sistema
USER root

# 1. Instalar dependencias básicas necesarias para descargar repositorios
RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 2. Instalar Node.js (Versión 18.x) necesaria para la aplicación del video
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# 3. Configurar el repositorio oficial de Docker e instalar el cliente (CLI)
# Nota: Usamos la nueva forma de Debian para manejar llaves GPG
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y docker-ce-cli

# 4. SOLUCIÓN AL ERROR DE GRUPO: Creamos el grupo docker y añadimos al usuario jenkins
RUN groupadd -f docker && \
    usermod -a -G docker jenkins

# Volvemos al usuario jenkins por seguridad para ejecutar la aplicación
USER jenkins