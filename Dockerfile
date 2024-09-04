# Use an official Node.js runtime as a parent image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json ./
COPY yarn.lock ./

# Install the app dependencies inside the container
RUN yarn install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN yarn build

# Use a smaller, final image for production
FROM node:18-slim

# Set the working directory in the final container
WORKDIR /app

# Copy built assets from the previous stage
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["yarn", "start"]
