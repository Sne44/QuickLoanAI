from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from .serializers import (
    UserSerializer,
    RegisterSerializer,
)


# ===========================================
# Register User
# ===========================================

class RegisterView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = RegisterSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message": "User Registered Successfully"
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


# ===========================================
# Current Logged-in User
# ===========================================

class CurrentUserView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = UserSerializer(request.user)

        return Response(serializer.data)


# ===========================================
# Change Password
# ===========================================

class ChangePasswordView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        current_password = request.data.get("current_password")

        new_password = request.data.get("new_password")

        confirm_password = request.data.get("confirm_password")

        # Check current password

        if not request.user.check_password(current_password):

            return Response(
                {
                    "error": "Current password is incorrect."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check new password match

        if new_password != confirm_password:

            return Response(
                {
                    "error": "Passwords do not match."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Password length validation

        if len(new_password) < 8:

            return Response(
                {
                    "error": "Password must be at least 8 characters."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Save password

        request.user.set_password(new_password)

        request.user.save()

        return Response(
            {
                "message": "Password changed successfully."
            },
            status=status.HTTP_200_OK,
        )