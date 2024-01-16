FROM node:19.6.0
ENV TZ="Asia/Manila"

WORKDIR /app

COPY . .

RUN npm install 
RUN npm install pm2@latest -g
RUN npm install ts-node@latest -g

CMD pm2 start pm2.json && tail -f /dev/null