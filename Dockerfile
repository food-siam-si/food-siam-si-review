FROM node:18.18.2-buster-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --omit=dev

COPY . .

CMD ["node", "server.js"]