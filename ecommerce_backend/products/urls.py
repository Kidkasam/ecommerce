from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductsList, CategoriesList

router = DefaultRouter()
router.register('categories', CategoriesList)
router.register('products', ProductsList)

urlpatterns = [
    path('', include(router.urls))
]