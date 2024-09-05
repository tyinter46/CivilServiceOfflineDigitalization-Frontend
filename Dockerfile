# Build stage
FROM node:18 AS build

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run the application
RUN yarn global add serve

# Copy built assets from build stage
COPY --from=build /app/build ./build

# Set environment variables
ENV NODE_ENV production

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "build", "-l", "3000"]