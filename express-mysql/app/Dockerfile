FROM node

ARG my_port=5000

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

COPY ["index.js", "/usr/src/"]

EXPOSE ${my_port}

CMD ["node", "index.js"]
