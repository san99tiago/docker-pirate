FROM node

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

COPY ["index.js", "/usr/src/"]

EXPOSE 3000

CMD ["node", "index.js"]
