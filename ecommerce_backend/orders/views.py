from django.shortcuts import render
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from rest_framework import viewsets, permissions


# Create your views here.
class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return orders belonging to the logged-in user
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Auto-assign the logged-in user when creating an order
        serializer.save(user=self.request.user)


class OrderItemView(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return items from the logged-in user's orders
        return OrderItem.objects.filter(order__user=self.request.user)