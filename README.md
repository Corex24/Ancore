FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache ffmpeg libc6-compat curl git python3 build-base vips-dev bash
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 600000
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
