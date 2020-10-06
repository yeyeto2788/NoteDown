# Nodejs build image
FROM node:14.11.0-stretch AS notedown_react
WORKDIR /react_app/
COPY ./react_app/ /react_app/
# Install dependencies and serve the app.
RUN npm install && npm run build


# Serve the application using NGINX
FROM node:14.11.0-stretch
COPY --from=notedown_react /react_app/build /build
COPY ./react_app/package.json /build/package.json
WORKDIR /build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-l", "3000"]