import random
from rest_framework import serializers, exceptions
from .models import User
from datetime import timedelta
from django.utils import timezone
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['phone_number', 'email', 'first_name', 'last_name',]

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=100, write_only=True)
    password_confirm = serializers.CharField(max_length=100, write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'password', 'password_confirm']

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password": "passwords do not match"})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        if 'username' not in validated_data:
            validated_data['username'] = validated_data['email']
        user = User.objects.create_user(**validated_data)
        
        user.otp = str(random.randint(100000, 999999))
        user.otp_expiry = timezone.now() + timedelta(minutes=5)
        user.save()

        print(f"--- OTP FOR {user.email}: {user.otp} ---")
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs ):
        data = super().validate(attrs)

        if not self.user.is_verified:
            raise exceptions.AuthenticationFailed("user isn't verfied")
        return data