from django.db import models
from users.models import User 


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True)
    image = models.ImageField(blank=True)
    brand = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    rating = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, default=0)
    numReviews = models.IntegerField(blank=True, null=True, default=0)
    price = models.DecimalField(max_digits=7, blank=True, null=True, decimal_places=2)
    countInStock = models.IntegerField(blank=True, null=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True)
    rating = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, default=0)
    comment = models.TextField(blank=True)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    payment_method = models.CharField(max_length=200, blank=True)
    tax_price = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    shipping_price = models.DecimalField(max_digits=7, blank=True, null=True, decimal_places=2)
    total_price = models.DecimalField(max_digits=7, blank=True, null=True, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True, blank=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.createdAt)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True)
    qty = models.IntegerField(blank=True, null=True, default=0)
    price = models.DecimalField(max_digits=7, blank=True, null=True, decimal_places=2)
    image = models.ImageField(blank=True)

    def __str__(self):
        return self.name


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True)
    address = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=200, blank=True)
    postal_code = models.IntegerField(blank=True, null=True, default=0)
    country = models.CharField(max_length=200, blank=True)
    shipping_price = models.DecimalField(max_digits=7, blank=True, null=True, decimal_places=2)

    def __str__(self):
        return self.address

