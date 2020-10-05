# Nodejs build image
FROM node:14.11.0-stretch AS notedown_react
WORKDIR /react_app/
COPY ./react_app/ /react_app/
# Set API url as a environment variable.
ENV REACT_APP_NOTEDOWN_API_URL $NOTEDOWN_API_URL
ENV http_proxy="http://local-zscaler.boehringer.com:80" \
    https_proxy="http://local-zscaler.boehringer.com:80" \
    no_proxy="http://local-zscaler.boehringer.com:80" \
    HTTP_PROXY="http://local-zscaler.boehringer.com:80" \
    HTTPS_PROXY="http://local-zscaler.boehringer.com:80" \
    NO_PROXY="http://local-zscaler.boehringer.com:80"
# Install dependencies and serve the app.
RUN npm set strict-ssl false && \
    npm install && npm run build


# Serve the application using NGINX
FROM node:14.11.0-stretch
COPY --from=notedown_react /react_app/build /build
COPY ./react_app/package.json /build/package.json
WORKDIR /build
ENV http_proxy="http://local-zscaler.boehringer.com:80" \
    https_proxy="http://local-zscaler.boehringer.com:80" \
    no_proxy="http://local-zscaler.boehringer.com:80" \
    HTTP_PROXY="http://local-zscaler.boehringer.com:80" \
    HTTPS_PROXY="http://local-zscaler.boehringer.com:80" \
    NO_PROXY="http://local-zscaler.boehringer.com:80"
RUN npm set strict-ssl false && npm install -g serve
EXPOSE 3000
CMD ["serve", "-l", "3000"]