import requests

BASE_URL = "http://localhost:5000/"

response = requests.get(BASE_URL + "developers/1")
print(response.json())
