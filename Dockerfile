# Use the official Node.js base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which your Express.js API listens
EXPOSE 3000

# Start the Express.js API
CMD ["node", "app.js"]
