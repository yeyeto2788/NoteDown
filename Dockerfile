# Nodejs build image
FROM node:14.11.0-stretch AS notedown_react
WORKDIR /react_app/
COPY ./react_app/ /react_app/
RUN npm set strict-ssl false && npm install && npm run build 

# Python build image (Final)
FROM python AS notedown_server
WORKDIR /python_app/notedown_api/build/
COPY --from=notedown_react /react_app/build/ .
COPY ./python_api/ /python_app/
WORKDIR /python_app
RUN pip install -r requirements.txt
EXPOSE 8080
ENTRYPOINT [ "python", "run.py"]
