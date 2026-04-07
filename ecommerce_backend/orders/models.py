from django.db import models
from django.contrib.auth import get_user_model
from products.models import Products

User = get_user_model()

# Create your models here.

STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('shipped', 'Shipped'),
    ('paid', 'Paid'),
    ('confirmed', 'Confirmed'),
    ('cancelled', 'Cancelled'),
    ('delivered', 'Delivered'),
]





class Order(models.Model):
    user  = models.ForeignKey(User, on_delete = models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    stripe_payment_id = models.CharField(max_length=255, blank=True, null=True)
    stripe_payment_status = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"order {self.id}- "

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete = models.CASCADE)
    product = models.ForeignKey(Products, on_delete =models.CASCADE)
    quantity = models.IntegerField(default=1)
    price =models.DecimalField(max_digits=10,  decimal_places=2)

    def __str__(self):
        return f"orderitem {self.quantity}- {self.product.name}"

def total_price(quantity, product):
    return product * quantity
