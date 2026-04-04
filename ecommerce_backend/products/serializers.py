from rest_framework import serializers
from .models import Products, Categories

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['name', 'slug' , 'description']

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ["category", "name", "description", "price", "stock", "created_at", "updated_at"]