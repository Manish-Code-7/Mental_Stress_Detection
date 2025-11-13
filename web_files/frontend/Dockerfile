FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy all source files
COPY . .

# Build the Next.js application
RUN npm run build

EXPOSE 3000

# Start the production server
CMD ["npm", "run", "start"]






