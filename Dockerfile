FROM node:17-alpine3.15 AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY package.json package-lock.json ./

RUN npm install
COPY . ./
# install node modules and build assets
RUN npm run build

# nginx state for serving content
FROM nginx:1.12-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /app/build .

EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]