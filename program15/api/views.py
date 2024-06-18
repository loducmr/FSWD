from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import User
from .serializers import UserSerializer
import json
def home(request):
    return render(request,'home.html')

def register(request):
    return render(request,'register.html')

def profile(request):
    return render(request,'profile.html')

@api_view(['POST'])
def getuser(request):
    req_email=request.data.get('email')
    Users=User.objects.filter(email=req_email)
    serializer = UserSerializer(Users,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def adduser(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)