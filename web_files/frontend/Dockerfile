FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci || npm install

# App code is bind-mounted by docker-compose for dev
EXPOSE 3000

CMD ["npm", "run", "dev"]






