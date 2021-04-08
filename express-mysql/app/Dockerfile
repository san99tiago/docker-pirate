FROM node

# Define default ports and host for app and db
ARG app_port=3000
ARG db_host=mysql_db
ARG db_port=3306

# Add important environment variables that the server consumes
ENV APP_PORT=${app_port}
ENV DB_HOST=${db_host}}
ENV DB_PORT=${db_port}}

# Add dependencies for the node modules (to be installed)
COPY ["package.json", "package-lock.json", "/usr/src/"]

# Specify working directory for the container
WORKDIR /usr/src

# Install node dependencies via npm
RUN npm install

# Add main app functionalities
COPY ["app.js", "/usr/src/"]
COPY ["./config/db.config.js", "/usr/src/config/"]
COPY ["./db/model.js", "/usr/src/db/"]
COPY ["./routes/developers.js", "/usr/src/routes/"]

EXPOSE ${app_port}

CMD ["node", "app.js"]
