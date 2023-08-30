FROM python:3

WORKDIR /authentication

ENV FLASK_APP=server.py

ENV FLASK_ENV=development

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 5001

CMD ["python3","server.py"]
