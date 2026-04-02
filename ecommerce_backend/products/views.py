from django.shortcuts import render
from .models import Categories, Products
from .serializers import CategoriesSerializer, ProductsSerializer
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
# Create your views here.
class CategoriesList(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class =CategoriesSerializer
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]

    
class ProductsList(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
