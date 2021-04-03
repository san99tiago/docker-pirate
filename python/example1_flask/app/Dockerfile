FROM python:3.9

ARG my_port=5000

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=${my_port}

COPY requirements.txt /var/flask-demo-app/requirements.txt
RUN pip install -r /var/flask-demo-app/requirements.txt

EXPOSE ${my_port}

COPY . .

CMD ["flask", "run"]
