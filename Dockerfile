# Step 1: Use Node.js as the base image for building the app
FROM node:lts-alpine AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and lock files for dependency installation
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN yarn build

# Step 2: Use a lightweight image for serving the app
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/ .

# Install only production dependencies
RUN yarn install --production

# Expose the default Next.js port
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]
