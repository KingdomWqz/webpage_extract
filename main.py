from ast import keyword
import requests
from bs4 import BeautifulSoup

url = "https://s.1688.com/selloffer/offer_search.htm"
params = {
    'keyword': 'iphone',
    'n': 'y',
    'netType': '1%2C11%2C16',
    'spm': 'a260k.dacugeneral.search.0'
}
r = requests.post(url, json=params)
# print(r.text)

soup = BeautifulSoup(r.text, 'html.parser')
print(soup.prettify())

file = open('test.txt', 'a')
file.write(soup.prettify())
file.close()

# res = json.loads(r.text)
# print(res.get("result")[0].get("data"))