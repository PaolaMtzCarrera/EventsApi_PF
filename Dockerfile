FROM node:20.11.1

WORKDIR  /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 300

CMD ["node","dist/src/app.js"]