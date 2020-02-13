# pyobjc
from playsound import playsound
import requests

res = requests.get(url = 'http://178.128.13.155/event')
print(res.json())
if 'message' in res.json():
  playsound('alert.mp3')