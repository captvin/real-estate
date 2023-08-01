FROM node:16-alpine

WORKDIR /real-estate

COPY package* .

RUN npm i 

COPY  . .

CMD ["npm", "run", "start"]