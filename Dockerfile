# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY ./src ./src
COPY .env ./

# Expose the port the application runs on
EXPOSE 3000

# Start the application
CMD ["node", "src/server.js"]