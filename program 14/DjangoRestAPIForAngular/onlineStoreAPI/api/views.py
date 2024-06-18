from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Product
from .serializers import ProductSerializer

@api_view(['GET'])
def getproducts(request):
    Products = Product.objects.all()
    serializer = ProductSerializer(Products,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addproduct(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)