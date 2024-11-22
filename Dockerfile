# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY ./src ./src

# Build TypeScript code
RUN npm run build

# Set environment variables
ARG WEBHOOK_SECRET
ARG PORT
ENV WEBHOOK_SECRET=$WEBHOOK_SECRET
ENV PORT=$PORT

# Expose the port the application runs on
EXPOSE $PORT

# Start the application
CMD ["node", "dist/server.js"]