# Python API image.
FROM python AS notedown_server
# Copy needed files
COPY ./python_api/ /python_app/
WORKDIR /python_app
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