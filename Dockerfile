# FROM node:18
FROM node:12.2.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start"]

# docker build -t node-cart2 .
# docker run -it -p 3000:3000 node-cart