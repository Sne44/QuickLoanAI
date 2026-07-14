from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )

    mobile_number = models.CharField(
        max_length=10,
        unique=True
    )

    house_name = models.CharField(
        max_length=100,
        blank=True,
        default=""
    )

    area = models.CharField(
        max_length=100,
        blank=True,
        default=""
    )

    city = models.CharField(
        max_length=100,
        blank=True,
        default=""
    )

    state = models.CharField(
        max_length=100,
        blank=True,
        default=""
    )

    pincode = models.CharField(
        max_length=6,
        blank=True,
        default=""
    )

    def __str__(self):
        return self.user.username