from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class User(AbstractUser):
    # Making these mandatory for consistent data
    email = models.EmailField(unique=True, max_length=255, blank=False)
    phone_number = models.CharField(max_length=20, blank=False)
    first_name = models.CharField(max_length=100, blank=False)
    last_name = models.CharField(max_length=100, blank=False)
    
    is_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_expiry = models.DateTimeField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] 

    def is_otp_valid(self):
        return self.otp_expiry and timezone.now() < self.otp_expiry

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"


