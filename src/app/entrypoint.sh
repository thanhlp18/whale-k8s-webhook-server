#!/bin/sh

# Set the AUTHORIZATION_TOKEN environment variable
export AUTHORIZATION_TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)

# Start the application
node src/server.js