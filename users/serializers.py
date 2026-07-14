from django.contrib.auth.models import User
from rest_framework import serializers

from .models import UserProfile


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    mobile_number = serializers.CharField(write_only=True)

    house_name = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True
    )

    area = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True
    )

    city = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True
    )

    state = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True
    )

    pincode = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True
    )

    class Meta:
        model = User

        fields = [
            "first_name",
            "last_name",
            "username",
            "email",

            "mobile_number",
            "house_name",
            "area",
            "city",
            "state",
            "pincode",

            "password",
        ]

    def create(self, validated_data):

        mobile = validated_data.pop("mobile_number")

        house_name = validated_data.pop("house_name", "")
        area = validated_data.pop("area", "")
        city = validated_data.pop("city", "")
        state = validated_data.pop("state", "")
        pincode = validated_data.pop("pincode", "")

        user = User.objects.create_user(

            username=validated_data["username"],
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            password=validated_data["password"],

        )

        UserProfile.objects.create(

            user=user,

            mobile_number=mobile,

            house_name=house_name,
            area=area,
            city=city,
            state=state,
            pincode=pincode,

        )

        return user


class UserSerializer(serializers.ModelSerializer):

    mobile_number = serializers.CharField(
        source="profile.mobile_number",
        read_only=True
    )

    house_name = serializers.CharField(
        source="profile.house_name",
        read_only=True
    )

    area = serializers.CharField(
        source="profile.area",
        read_only=True
    )

    city = serializers.CharField(
        source="profile.city",
        read_only=True
    )

    state = serializers.CharField(
        source="profile.state",
        read_only=True
    )

    pincode = serializers.CharField(
        source="profile.pincode",
        read_only=True
    )

    is_admin = serializers.SerializerMethodField()

    class Meta:
        model = User

        fields = [

            "id",
            "username",
            "first_name",
            "last_name",
            "email",

            "mobile_number",
            "house_name",
            "area",
            "city",
            "state",
            "pincode",

            "is_staff",
            "is_superuser",
            "is_admin",

        ]

    def get_is_admin(self, obj):
        return obj.is_staff or obj.is_superuser