FROM node:20

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN npm run prestart

CMD ["npm", "run", "prod"]
