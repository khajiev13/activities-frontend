FROM node:15.13-alpine
WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
