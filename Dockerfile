# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Install kubectl
RUN apk add --no-cache curl && \
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
    install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl && \
    rm kubectl

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY ./src ./src

# Set environment variables
ARG GITHUB_SECRET
ARG PORT
ENV GITHUB_SECRET=$GITHUB_SECRET
ENV PORT=$PORT

# Expose the port the application runs on
EXPOSE $PORT

# Copy the entrypoint script
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Start the application
CMD ["/usr/src/app/entrypoint.sh"]