from django.db import models

# Create your models here.


class Categories(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique= True)
    description = models.TextField()
    
    def __str__(self):
        return f"category {self.name}"
class Products(models.Model):
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    name =models.CharField(max_length=100)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    price = models.DecimalField(default=0, max_digits=12, decimal_places=2)
    description = models.TextField()
    stock = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"product {self.name}"

    

