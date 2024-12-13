# Stage 1: Build the Vite app
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all source code
COPY . .

# Build the app
ARG VITE_APP_API_KEY
ARG VITE_APP_BASE_URL

# Create .env file inside the container
RUN echo "VITE_APP_API_KEY=$VITE_APP_API_KEY" >> .env
RUN echo "VITE_APP_BASE_URL=$VITE_APP_BASE_URL" >> .env

# Build the production version
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy build output to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
