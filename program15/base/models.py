from django.db import models

# Create your models here.
class User(models.Model):
    userid = models.IntegerField() 
    username = models.CharField(max_length=200)
    occupation = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    created_date = models.DateTimeField(auto_now_add=True)