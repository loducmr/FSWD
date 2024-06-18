from django.urls import path
from . import views

urlpatterns = [
    path('',views.home),
    path('register/',views.register,name="register"),
    path('profile/',views.profile,name="profile"),
    path('add/', views.adduser,name="add"),
    path('get/',views.getuser,name="get")
]