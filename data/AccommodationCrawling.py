from cgitb import text
import requests
from bs4 import BeautifulSoup
import csv

url = "https://www.goodchoice.kr/product/recommend/153"
request = requests.get('https://www.goodchoice.kr/product/recommend/153')
soup = BeautifulSoup(request.content, features="html.parser")
request.close()

# print(soup)
find_str = soup.find('div', attrs={'id': 'poduct_list_area'})
# print(find_str)
list = []
for content in find_str.findAll('li', attrs={'class': 'list_4'}):
    # print(content)
    title = content.find('strong').text.replace("\n", "").strip()
    alat = content.find('a').attrs['data-alat']
    alng = content.find('a').attrs['data-alng']
    img = content.find('img').attrs['data-original']
    addr = str(content.find('div', attrs={'class': 'name'}).select(
        'p:nth-child(3)')).replace("<p>", "").replace("</p>", "").replace("\n", "").replace("[", "").replace("]", "").strip()

    list.append([title, alat, alng, img, addr])

print(list)

f = open("data.csv", "w", encoding='utf-8-sig', newline='')
writer = csv.writer(f)
writer.writerows(list)
f.close()
