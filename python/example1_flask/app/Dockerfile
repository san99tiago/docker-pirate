FROM python:3.9

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
COPY requirements.txt /var/flask-demo-app/requirements.txt
RUN pip install -r /var/flask-demo-app/requirements.txt
EXPOSE 5000
COPY . .

CMD ["flask", "run"]
