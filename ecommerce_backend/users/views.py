import random
from django.core.mail import send_mail
from datetime import timedelta
from django.utils import timezone
from rest_framework import generics, permissions, status
from .models import User
from .serializers import UserSerializer, RegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CustomTokenObtainPairSerializer

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class VerifyOtpView(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        try:
            user = User.objects.get(email=email)
            if user.otp == otp and user.is_otp_valid():
                user.is_verified = True
                user.otp = None
                user.save()
                return Response({"message": "Account verified successfully!"})
            else:
                return Response({"error": "Invalid or expired OTP"}, status=400)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

class ResendOtpView(APIView):
    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)

            if user.is_verified:
                return Response({"message": "user is already verified"}, status=400)
            
            user.otp = str(random.randint(100000, 999999))
            user.otp_expiry = timezone.now() + timedelta(minutes=5)
            user.save()
            send_mail(

                subject='Your New Verification Code',
                message=f'Your new OTP code is: {user.otp}. It will expire in 5 minutes.',
                from_email='noreply@yourapp.com',
                recipient_list=[user.email],
                fail_silently=False,

            )

            
            return Response({"message": "Verification code resent successfully!"})
                
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
