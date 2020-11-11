# Nodejs build image
FROM node:14.11.0-stretch AS notedown_react
WORKDIR /react_app/
COPY ./react_app/ /react_app/
# Install dependencies and build the app.
RUN npm install && npm run build

# Serve all application parts using NGINX
FROM nginx:1.17.1-alpine
COPY ./deployment/nginx.conf /etc/nginx/nginx.conf
COPY --from=notedown_react /react_app/build /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]