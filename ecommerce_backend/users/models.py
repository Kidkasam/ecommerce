from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    phone_number= models.CharField(max_length=20, blank=False)
    email = models.EmailField(max_length=20, blank=False, unique=True)
    first_name = models.CharField(max_length=100, blank=False)
    last_name = models.CharField(max_length=100, blank=False)


    def __str__ (self):
        return self.first_name


