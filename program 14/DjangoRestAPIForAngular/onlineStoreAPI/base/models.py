from django.db import models

# Create your models here.
class Product(models.Model):
    prodcat = models.CharField(max_length=200)
    pid = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    cost = models.IntegerField()
    created_date = models.DateTimeField(auto_now_add=True)
    