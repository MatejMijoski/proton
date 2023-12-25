FROM nikolaik/python-nodejs:python3.11-nodejs18-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# install necessary packages for psycopg2
RUN apt-get update && apt-get -y install g++ libpq-dev gcc unixodbc unixodbc-dev
COPY /proton-backend/requirements.txt /app/proton-backend/
RUN pip install --no-cache-dir -r /app/proton-backend/requirements.txt

COPY /proton-frontend/package.json /app/proton-frontend/
RUN npm install proton-frontend/
