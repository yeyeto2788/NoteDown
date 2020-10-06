# Nodejs build image
FROM node:14.11.0-stretch AS notedown_react
WORKDIR /react_app/
COPY ./react_app/ /react_app/
# Install dependencies and build the app.
RUN npm install && npm run build


# Serve the application using NGINX
FROM node:14.11.0-stretch
# Copy files from previous layer.
COPY --from=notedown_react /react_app/build /build
# Copy package.json.
COPY ./react_app/package.json /build/package.json
WORKDIR /build
# Install dependencies.
RUN npm install -g serve
EXPOSE 3000
# Execute the server.
CMD ["serve", "-l", "3000"]