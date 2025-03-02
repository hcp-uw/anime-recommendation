from django.urls import path

from . import views


app_name = "common"
urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("about", views.IndexView.as_view(), name="about"),
    path("recs", views.IndexView.as_view(), name="recs"),
]
