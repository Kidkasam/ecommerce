from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartView, CartItemView

router = DefaultRouter()
router.register('cart', CartView, basename='cart')
router.register('cart-items', CartItemView, basename='cartitem')

urlpatterns = [
    path('', include(router.urls))
]
