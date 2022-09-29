FROM python:3.10.6
WORKDIR /usr/src/app
COPY requirements.txt ./

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . .
EXPOSE 7777
CMD ["./manage.py","runserver","7777"]