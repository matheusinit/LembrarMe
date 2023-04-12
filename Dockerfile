FROM node:16.19.1-alpine3.17

# Define folder where all files will be
WORKDIR /app

# Copy package.json to image
COPY ./package.json .

# Generate package-lock.json
RUN npm i --package-lock-only

# Install all dependencies to generate the build
RUN npm ci

# Move all source code to generate build
COPY ./src ./src

# Move prisma
COPY ./prisma ./prisma

# Create prisma artifacts
RUN npx prisma generate

# Build
RUN npm run build

# Run server on container entrypoint
CMD ["node", "dist/server.js"]
