from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderView, OrderItemView, CreateCheckoutSession, stripe_webhook, CheckoutView

router = DefaultRouter()
router.register('orders', OrderView, basename='order')
router.register('order-items', OrderItemView, basename='orderitem')

urlpatterns = [
    path('orders/checkout/', CheckoutView.as_view(), name='checkout'),
    path('orders/stripe/checkout-session/', CreateCheckoutSession.as_view(), name='create-checkout-session'),
    path('webhook/', stripe_webhook),
    path('', include(router.urls)),
]