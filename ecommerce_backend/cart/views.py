from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer


class CartView(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Each user only sees their own cart
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Auto-assign cart to logged-in user
        serializer.save(user=self.request.user)


class CartItemView(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return items from the logged-in user's cart
        return CartItem.objects.filter(cart__user=self.request.user)
