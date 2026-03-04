from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['phone_number', 'email', 'first_name', 'last_name',]

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=100, write_only=True)
    password_confirm = serializers.CharField(max_length=100, write_only=True)

    class Meta:
        model = User
        fields = ['phone_number', 'email', 'first_name', 'last_name', 'password', 'password_confirm']

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password": "passwords do not match"})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        # Since username is required by AbstractUser but not in fields, 
        # we'll use email as username if not provided.
        if 'username' not in validated_data:
            validated_data['username'] = validated_data['email']
        user = User.objects.create_user(**validated_data)
        return user

