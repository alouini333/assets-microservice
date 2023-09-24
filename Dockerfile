FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the app dependencies inside the container
RUN npm install

# Copy the app source code into the container
COPY dist /app/dist

# Specify the port the app runs on
EXPOSE 3001

# Define the command to run the app
CMD [ "npm", "run", "serve" ]
