# Python API image.
FROM python AS notedown_server
COPY ./python_api/ /python_app/
WORKDIR /python_app
ENV http_proxy="http://local-zscaler.boehringer.com:80" \
    https_proxy="http://local-zscaler.boehringer.com:80" \
    no_proxy="http://local-zscaler.boehringer.com:80" \
    HTTP_PROXY="http://local-zscaler.boehringer.com:80" \
    HTTPS_PROXY="http://local-zscaler.boehringer.com:80" \
    NO_PROXY="http://local-zscaler.boehringer.com:80"
# Install dependencies and serve the API.
RUN pip install -r requirements.txt
# Expose used port on the API logic.
EXPOSE 8080
# Gather DB URL argument.
ARG NOTEDOWN_DB_URL
# Set corresponding environment variables.
ENV NOTEDOWN_DB_URL $NOTEDOWN_DB_URL
# Execute the API.
ENTRYPOINT [ "python", "run.py"]