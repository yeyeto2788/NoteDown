FROM node as node_build
COPY ./react_app/ /node_app/
WORKDIR /node_app/
RUN npm install && npm build


FROM python
COPY ./python_api/ /python_app/
COPY /node_app/build/ FROM node_build /python_app/notedown_api/build/
WORKDIR /python_app/
RUN pip install -r requirements.txt && python run.py
