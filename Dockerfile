FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install nodemon -g

EXPOSE 3000

CMD ["npm", "run", "nodemon"]