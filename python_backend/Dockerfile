# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/

EXPOSE 8000
ENV ADDRESS=0.0.0.0 PORT=8000 DB_HOST=postgres DB_PORT=5432 DB_NAME=sendit DB_USER=sendit DB_PASS=sendit
CMD ["python3", "JudgeService/manage.py", "runserver", "0.0.0.0:8000"]
