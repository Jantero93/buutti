# Build environment
FROM node:20-alpine3.17 AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app/
RUN npm install -g npm@10.1.0
RUN npm ci --silent

ARG VITE_APP_API_URL
ENV VITE_APP_API_URL $VITE_APP_API_URL

COPY . /app
RUN npm run build

# Production environment
FROM nginx:1.25.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]