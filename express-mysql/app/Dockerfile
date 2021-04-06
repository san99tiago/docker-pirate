FROM node

ARG app_port=3000
ARG db_host=mysql_db
ARG db_port=3306

ENV APP_PORT=${app_port}
ENV DB_HOST=${db_host}}
ENV DB_PORT=${db_port}}

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

COPY ["app.js", "/usr/src/"]
COPY ["./config/db.config.js", "/usr/src/config/"]
COPY ["./db/model.js", "/usr/src/db/"]
COPY ["./routes/developers.js", "/usr/src/routes/"]

EXPOSE ${app_port}

CMD ["node", "app.js"]
