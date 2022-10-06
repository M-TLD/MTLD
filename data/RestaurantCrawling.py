from cgitb import text
from bs4 import BeautifulSoup
import csv
import urllib

import time
from selenium import webdriver

from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

SCROLL_PAUSE_TIME = 0.2

driver = webdriver.Chrome('C:\driver\chromedriver')

driver.implicitly_wait(3)

locationList = []

totalList = []
num = 1


def getAddr():
    url = "https://www.diningcode.com/list.dc"
    driver.get(url)
    driver.find_element_by_xpath(
        '//*[@id="root"]/div/div/div[1]/div[2]/div[1]/div[1]/button[4]').click()

    html = driver.page_source
    soup = BeautifulSoup(html, features="html.parser")

    find_city = soup.find('ul', attrs={'class': 'D1'})
    index = 0
    for cityCode in find_city.findAll('li'):
        index += 1
        city = cityCode.text
        # if(city == '서울'):
        #     continue

        url = "https://www.diningcode.com/list.dc"
        driver.get(url)
        driver.find_element_by_xpath(
            '//*[@id="root"]/div/div/div[1]/div[2]/div[1]/div[1]/button[4]').click()

        driver.find_element_by_xpath(
            '//*[@id="root"]/div/div[2]/div/div[3]/div[1]/ul[1]/li['+str(index)+']/button').click()

        html = driver.page_source
        soup = BeautifulSoup(html, features="html.parser")

        find_gu = soup.find('ul', attrs={'class': 'D2'})
        idx = 2
        for guCode in find_gu.findAll('li'):

            gu = guCode.text
            print(gu)
            if(gu == '전체'):
                continue

            driver.find_element_by_xpath(
                '//*[@id="root"]/div/div[2]/div/div[3]/div[1]/ul[2]/li[' + str(idx) + ']/button').click()

            html = driver.page_source
            soup = BeautifulSoup(html, features="html.parser")

            idx += 1
            find_station = soup.find('ul', attrs={'class': 'D3'})
            for stationCode in find_station('li'):
                station = stationCode.text
                if(station == '전체'):
                    continue
                addr = city+" "+gu+" +"+station
                print(addr)
                global totalList
                totalList = totalList + (getRestaurant(addr))

            url = "https://www.diningcode.com/list.dc"
            driver.get(url)

            driver.find_element_by_xpath(
                '//*[@id="root"]/div/div/div[1]/div[2]/div[1]/div[1]/button[4]').click()

            driver.find_element_by_xpath(
                '//*[@id="root"]/div/div[2]/div/div[3]/div[1]/ul[1]/li['+str(index)+']/button').click()

            html = driver.page_source
            soup = BeautifulSoup(html, features="html.parser")


def getRestaurant(addr):
    query = "반려견동반카페"
    encoded_addr = urllib.parse.quote(addr)
    encoded_query = urllib.parse.quote(query)
    url = "https://www.diningcode.com/list.dc?addr=" + \
        encoded_addr+"&query="+encoded_query

    driver.get(url)

    # 스크롤 끝까지 내린 다음 크롤링 하기

    try:
        print(addr)
        itemlist = driver.find_element_by_class_name(
            "PoiListMain")
        html = driver.page_source
        # print(html)

        # 스크롤 끝까지 내린 후 크롤링
        soup = BeautifulSoup(html, features="html.parser")
        placeCount = soup.find('span', attrs={'class': 'Place-Count'}).text
        # print(placeCount)
        repeat = 0
        try:
            repeat = int(placeCount) // 20 + 1
        except:  # placeCount가 10,000+로 나오는 경우가 있음
            repeat = 1
        # print(repeat)

        list = []

        for i in range(0, repeat):
            driver.execute_script(
                "arguments[0].scrollBy(0, 5000)", itemlist)

            time.sleep(SCROLL_PAUSE_TIME)

        html = driver.page_source
        # print(html)
        soup = BeautifulSoup(html, features="html.parser")
        find_list = soup.find('ol', attrs={'class': 'sc-bczRLJ dHVLvm'})

        for content in find_list.findAll('li', attrs={'class': 'PoiBlockContainer'}):
            title = content.find('h2').text
            img = content.find('img').attrs['src']
            temp = []
            global num
            temp.append(num)
            num += 1

            temp = temp + title.split('. ')

            addr = addr.replace('+', "")
            temp = temp + addr.split()
            temp.append(img)

            try:
                review = content.find('span', attrs={'class': 'Review'}).text
                review = review.replace("\n", "").replace(",", " ").strip()
                temp.append(review)
            except:
                temp.append("")

            try:
                userScore = content.find(
                    'p', attrs={'class': 'UserScore'}).text
                temp.append(userScore)
            except:
                temp.append("")

            list.append(temp)
        # print(find_list)
        map = soup.select(
            "#map > div:nth-child(3) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div")
        # print(map)

        for content in map:
            marker = content.find('div', attrs={'class': 'Marker'})
            try:
                n = int(content.select_one('span').text)

                lat = marker.get("data-lat")
                lng = marker.get("data-lng")
                list[n-1].append(lat)
                list[n-1].append(lng)
            except:
                continue
        return list
    except:
        driver.find_element_by_xpath(
            '//*[@id="root"]/div/div[2]/div/div/button').click()
        return []


getAddr()

print(len(totalList))
f = open("data.csv", "w", encoding='utf-8-sig', newline='')
writer = csv.writer(f)
writer.writerows(totalList)
f.close()
