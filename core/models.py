from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUserModel(AbstractUser):
    phone_number = models.CharField(max_length=11, unique=True)
    email = models.EmailField(unique=True)
