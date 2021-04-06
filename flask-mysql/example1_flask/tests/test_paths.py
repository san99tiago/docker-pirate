import requests

BASE_URL = "http://localhost:5000/"
body = {
    "name": "Camila",
    "lastname": "Yepes Ruiz",
    "id_type": "cc",
    "id_value": "4444",
    "area": "Infrastructure",
    "age": 22
}

response = requests.get(BASE_URL + "developers/cc/0000")
print(response.json())
print(response.status_code)

response = requests.put(BASE_URL + "developers/cc/4444", body)
print(response.json())
print(response.status_code)

response = requests.get(BASE_URL + "developers/cc/4444")
print(response.json())
print(response.status_code)

response = requests.delete(BASE_URL + "developers/cc/4444")
print(response)

response = requests.delete(BASE_URL + "developers/cc/4444")
print(response)
