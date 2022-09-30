import pandas as pd
from bs4 import BeautifulSoup
import csv
import urllib

import time
from selenium import webdriver

from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
driver = webdriver.Chrome('C:\driver\chromedriver')

driver.implicitly_wait(3)
SCROLL_PAUSE_TIME = 1

rest = pd.read_csv("C:\ssafy\RestaurantData.csv")
rest['img'] = 0

for i in rest.index:
    town = rest._get_value(i, 'town')
    name = rest._get_value(i, 'name')
    url = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query="+town+" "+name
    driver.get(url)

    html = driver.page_source
    soup = BeautifulSoup(html, features="html.parser")

    imgTag = soup.find('div', attrs={'class' : 'K0PDV _div'})
    # print(imgTag)
    # print(type(imgTag))
    try :
        imgStr = imgTag['style']
        # print(imgStr)
        img = imgStr.split('image:url("')[1][:-2]
        print(img)
        rest.loc[i,'img'] = img
        # print(type(img))
    except:
        print("except")

rest.to_csv('sample.csv')
