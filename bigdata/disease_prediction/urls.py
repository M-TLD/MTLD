from django.urls import path
from .views import get_post

urlpatterns=[
    path('<condition>/',get_post)
]