FROM node:16-alpine
WORKDIR /var/www/html/dashboard
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false && yarn cache clean
COPY . .
CMD [ "yarn","dev" ]