FROM node:14

WORKDIR /home/node/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

ENV NODE_ENV production

RUN yarn build

CMD ["npm", "start"]