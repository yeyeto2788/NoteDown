# Nodejs build image
FROM node:14.11.0-stretch AS notedown_react
WORKDIR /react_app/
COPY ./react_app/ /react_app/
# Retrieve the value
ARG NOTEDOWN_API_URL
# Set API url as a environment variable.
ENV REACT_APP_NOTEDOWN_API_URL $NOTEDOWN_API_URL
# Expose default port for 'serve'
EXPOSE 3000
# Install dependencies and serve the app.
RUN npm set strict-ssl false && \
    npm install && \
    npm run build

# Serve the application using NGINX
FROM nginx:1.17.1-alpine
COPY --from=notedown_react /react_app/build /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]