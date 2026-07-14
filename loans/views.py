from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.utils import timezone

from openpyxl import Workbook

from django.db.models import Q

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
)
from reportlab.lib.styles import getSampleStyleSheet

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
)
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from .models import LoanApplication, Notification

from .serializers import (
    LoanApplicationSerializer,
    NotificationSerializer,
)

from ai_engine.predictor import predict_loan


# ===========================================
# User Loan Application
# ===========================================

class LoanApplicationListCreateView(generics.ListCreateAPIView):

    serializer_class = LoanApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        if self.request.user.is_staff:
            return LoanApplication.objects.all().order_by("-submitted_at")

        return LoanApplication.objects.filter(
            user=self.request.user
        ).order_by("-submitted_at")

    def perform_create(self, serializer):

        user = self.request.user

        if user.is_staff:
            raise PermissionDenied(
                "Admins cannot apply for loans."
            )

        result = predict_loan(
            serializer.validated_data["age"],
            serializer.validated_data["income"],
            serializer.validated_data["loan_amount"],
            serializer.validated_data["credit_score"],
        )

        serializer.save(
            user=user,
            prediction=result["prediction"],
            feedback=result["message"],
            eligibility=result["eligibility"],
            ai_tip=result["ai_tip"],
        )

        Notification.objects.create(
            user=user,
            title="Loan Application Submitted",
            message="Your loan application has been submitted successfully."
        )

        Notification.objects.create(
            user=user,
            title="AI Analysis Completed",
            message=f"AI Prediction: {result['prediction']}"
        )


# ===========================================
# Admin Dashboard Analytics
# ===========================================

class AdminAnalyticsView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        total_users = User.objects.filter(
            is_staff=False
        ).count()

        total_loans = LoanApplication.objects.count()

        approved = LoanApplication.objects.filter(
            status="Approved"
        ).count()

        rejected = LoanApplication.objects.filter(
            status="Rejected"
        ).count()

        pending = LoanApplication.objects.filter(
            status="Pending"
        ).count()

        approval_rate = 0

        if total_loans > 0:

            approval_rate = round(
                approved * 100 / total_loans,
                2,
            )

        return Response({

            "total_users": total_users,
            "total_loans": total_loans,
            "approved": approved,
            "rejected": rejected,
            "pending": pending,
            "approval_rate": approval_rate,

        })


# ===========================================
# Admin Loan List
# ===========================================

class AdminLoanListView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        loans = LoanApplication.objects.all().order_by(
            "-submitted_at"
        )

        search = request.GET.get("search", "")
        status = request.GET.get("status", "")

        if search:

            loans = loans.filter(

                Q(full_name__icontains=search) |
                Q(user__username__icontains=search)

            )

        if status and status != "All":

            loans = loans.filter(
                status=status
            )

        serializer = LoanApplicationSerializer(
            loans,
            many=True,
        )

        return Response(serializer.data)


# ===========================================
# Export Loans to Excel
# ===========================================

class ExportLoansExcelView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        workbook = Workbook()

        sheet = workbook.active
        sheet.title = "Loan Applications"

        sheet.append([

            "Applicant",
            "Username",
            "Gender",
            "Age",
            "Income",
            "Loan Amount",
            "Credit Score",
            "Employment",
            "Prediction",
            "Status",
            "Eligibility %",
            "Applied On",

        ])

        loans = LoanApplication.objects.all().order_by(
            "-submitted_at"
        )

        for loan in loans:

            sheet.append([

                loan.full_name,
                loan.user.username,
                loan.gender,
                loan.age,
                loan.income,
                loan.loan_amount,
                loan.credit_score,
                loan.employment_status,
                loan.prediction,
                loan.status,
                loan.eligibility,
                loan.submitted_at.strftime("%d-%m-%Y %H:%M"),

            ])

        response = HttpResponse(
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )

        response[
            "Content-Disposition"
        ] = 'attachment; filename="LoanApplications.xlsx"'

        workbook.save(response)

        return response


# ===========================================
# Approve / Reject Loan
# ===========================================

class UpdateLoanStatusView(APIView):

    permission_classes = [IsAdminUser]

    def post(self, request, pk):

        loan = get_object_or_404(
            LoanApplication,
            id=pk,
        )

        status = request.data.get("status")

        if status not in [

            "Approved",
            "Rejected",
            "Pending",

        ]:

            return Response(

                {
                    "error": "Invalid Status"
                },

                status=400,

            )

        loan.status = status

        if status == "Pending":

            loan.reviewed_at = None

        else:

            loan.reviewed_at = timezone.now()

        loan.save()

        Notification.objects.create(
            user=loan.user,
            title="Loan Status Updated",
            message=f"Your loan has been {status}."
        )

        return Response({

            "message": "Loan Updated Successfully"

        })
    
# ===========================================
# Download Loan PDF
# ===========================================

class LoanReportPDFView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        loan = get_object_or_404(
            LoanApplication,
            id=pk,
            user=request.user,
        )

        response = HttpResponse(
            content_type="application/pdf"
        )

        response[
            "Content-Disposition"
        ] = f'attachment; filename="Loan_Report_{loan.id}.pdf"'

        document = SimpleDocTemplate(response)

        styles = getSampleStyleSheet()

        elements = []

        elements.append(
            Paragraph(
                "<b>QuickLoanAI</b>",
                styles["Title"],
            )
        )

        elements.append(
            Paragraph(
                "Loan Application Report",
                styles["Heading2"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>Applicant:</b> {loan.full_name}",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>Income:</b> ₹{loan.income}",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>Loan Amount:</b> ₹{loan.loan_amount}",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>Employment:</b> {loan.employment_status}",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>Credit Score:</b> {loan.credit_score}",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>Eligibility:</b> {loan.eligibility}%",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>AI Prediction:</b> {loan.prediction}",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>AI Feedback:</b> {loan.feedback}",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>AI Tip:</b> {loan.ai_tip}",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>Status:</b> {loan.status}",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>Generated:</b> {loan.created_at.strftime('%d-%m-%Y %H:%M')}",
                styles["Normal"],
            )
        )

        document.build(elements)

        return response


# ===========================================
# Smart Loan Suggestions
# ===========================================

class SmartSuggestionView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        loan = LoanApplication.objects.filter(
            user=request.user
        ).order_by("-submitted_at").first()

        if not loan:

            return Response({
                "suggestion": "Apply for a loan to receive personalized suggestions."
            })

        return Response({
            "suggestion": loan.feedback
        })


# ===========================================
# AI Tips Card
# ===========================================

class AITipsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        loan = LoanApplication.objects.filter(
            user=request.user
        ).order_by("-submitted_at").first()

        if not loan:

            return Response({
                "tip": "Maintain a good credit score for better loan approval chances."
            })

        return Response({
            "tip": loan.ai_tip
        })


# ===========================================
# Eligibility Meter
# ===========================================

class EligibilityMeterView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        loan = LoanApplication.objects.filter(
            user=request.user
        ).order_by("-submitted_at").first()

        if not loan:

            return Response({
                "eligibility": 0
            })

        return Response({
            "eligibility": loan.eligibility
        })


# ===========================================
# Notification List
# ===========================================

class NotificationListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        notifications = Notification.objects.filter(
            user=request.user
        )

        serializer = NotificationSerializer(
            notifications,
            many=True
        )

        return Response(serializer.data)


# ===========================================
# Mark Notification Read
# ===========================================

class MarkNotificationReadView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        notification = get_object_or_404(
            Notification,
            id=pk,
            user=request.user
        )

        notification.is_read = True

        notification.save()

        return Response({
            "message": "Notification marked as read."
        })    