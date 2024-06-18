from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return render(request,'home.html')

def dashboard(request):
    return render(request,'dashboard.html')

def contactUs(request):
    return render(request,'contactUs.html')