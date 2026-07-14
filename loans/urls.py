from django.urls import path

from .views import (
    LoanApplicationListCreateView,
    AdminAnalyticsView,
    AdminLoanListView,
    UpdateLoanStatusView,
    ExportLoansExcelView,
    LoanReportPDFView,
    SmartSuggestionView,
    AITipsView,
    EligibilityMeterView,

    # Notifications
    NotificationListView,
    MarkNotificationReadView,
)

urlpatterns = [

    # ==========================
    # User Loan APIs
    # ==========================

    path(
        "applications/",
        LoanApplicationListCreateView.as_view(),
        name="loan-applications",
    ),

    path(
        "loan-report/<int:pk>/",
        LoanReportPDFView.as_view(),
        name="loan-report",
    ),

    path(
        "smart-suggestions/",
        SmartSuggestionView.as_view(),
        name="smart-suggestions",
    ),

    path(
        "ai-tips/",
        AITipsView.as_view(),
        name="ai-tips",
    ),

    path(
        "eligibility-meter/",
        EligibilityMeterView.as_view(),
        name="eligibility-meter",
    ),

    # ==========================
    # Notifications
    # ==========================

    path(
        "notifications/",
        NotificationListView.as_view(),
        name="notifications",
    ),

    path(
        "notifications/read/<int:pk>/",
        MarkNotificationReadView.as_view(),
        name="notification-read",
    ),

    # ==========================
    # Admin APIs
    # ==========================

    path(
        "analytics/",
        AdminAnalyticsView.as_view(),
        name="analytics",
    ),

    path(
        "admin-loans/",
        AdminLoanListView.as_view(),
        name="admin-loans",
    ),

    path(
        "update-loan/<int:pk>/",
        UpdateLoanStatusView.as_view(),
        name="update-loan",
    ),

    path(
        "export-excel/",
        ExportLoansExcelView.as_view(),
        name="export-excel",
    ),
]