# Use an official Node.js runtime as a parent image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json ./
COPY yarn.lock ./

# Install the app dependencies inside the container
RUN ["yarn", "install"]

# Copy the rest of the application code to the container
COPY build .


RUN ["yarn", "build"]

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
