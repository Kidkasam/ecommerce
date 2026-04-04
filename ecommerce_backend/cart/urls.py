from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartView, CartItemView, AddToCartView

router = DefaultRouter()
router.register('view', CartView, basename='cart')
router.register('items', CartItemView, basename='cartitem')

urlpatterns = [
    path('add/', AddToCartView.as_view(), name='add-to-cart'),
    path('', include(router.urls)),
]
