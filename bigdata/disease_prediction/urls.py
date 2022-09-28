from django.urls import path

from .views import disease_predict, load_data

urlpatterns=[
    path('loadData/',load_data),
    path('<condition>/',disease_predict)
]