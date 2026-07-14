from rest_framework import serializers
from .models import LoanApplication, Notification


class LoanApplicationSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = LoanApplication

        fields = [

            "id",
            "user",
            "username",

            # Applicant Details
            "full_name",
            "age",
            "gender",

            # Financial Details
            "income",
            "loan_amount",
            "credit_score",
            "employment_status",

            # AI Results
            "prediction",
            "feedback",
            "eligibility",
            "ai_tip",

            # Loan Status
            "status",

            # Timeline
            "submitted_at",
            "reviewed_at",

            "created_at",

        ]

        read_only_fields = [

            "id",
            "user",
            "username",

            "prediction",
            "feedback",
            "eligibility",
            "ai_tip",

            "status",

            "submitted_at",
            "reviewed_at",

            "created_at",

        ]


class NotificationSerializer(serializers.ModelSerializer):

    class Meta:

        model = Notification

        fields = "__all__"

        read_only_fields = (
            "user",
            "created_at",
        )