FROM docker.1panel.dev/node:20-alpine
WORKDIR /app
COPY * /app/
#RUN ls ./
#COPY ../package*.json .
RUN npm config set registry https://registry.npm.taobao.org/
RUN npm install 
EXPOSE 3000
CMD ["npm", "run", "dev"]