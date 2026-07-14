from django.db import models
from django.contrib.auth.models import User


class LoanApplication(models.Model):

    # ======================================
    # Choices
    # ======================================

    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Approved", "Approved"),
        ("Rejected", "Rejected"),
    ]

    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other"),
    ]

    EMPLOYMENT_CHOICES = [
        ("Employed", "Employed"),
        ("Self Employed", "Self Employed"),
        ("Student", "Student"),
        ("Unemployed", "Unemployed"),
    ]

    # ======================================
    # User
    # ======================================

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    # ======================================
    # Personal Details
    # ======================================

    full_name = models.CharField(
        max_length=100
    )

    age = models.IntegerField()

    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES,
        default=""
    )

    address = models.TextField(
        blank=True,
        default=""
    )

    # ======================================
    # Financial Details
    # ======================================

    income = models.FloatField()

    loan_amount = models.FloatField()

    credit_score = models.IntegerField()

    employment_status = models.CharField(
        max_length=30,
        choices=EMPLOYMENT_CHOICES,
        default="Employed"
    )

    # ======================================
    # AI Result
    # ======================================

    prediction = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    feedback = models.TextField(
        blank=True,
        default=""
    )

    eligibility = models.IntegerField(
        default=0
    )

    ai_tip = models.TextField(
        blank=True,
        default=""
    )

    # ======================================
    # Loan Status
    # ======================================

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    # ======================================
    # Timeline
    # ======================================

    submitted_at = models.DateTimeField(
        auto_now_add=True
    )

    reviewed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-submitted_at"]

    def __str__(self):
        return f"{self.full_name} - {self.status}"


# ======================================
# Notification Model
# ======================================

class Notification(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notifications"
    )

    title = models.CharField(
        max_length=150
    )

    message = models.TextField()

    is_read = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title