FROM node:22
WORKDIR /calculator
COPY package*.json ./
RUN npm install --omit=dev
COPY server.js index.html ./
EXPOSE 3000
CMD ["node","server.js"]