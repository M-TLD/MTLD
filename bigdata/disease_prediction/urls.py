from django.urls import path

from .views import disease_predict, load_data

urlpatterns=[
    path('',disease_predict),
]