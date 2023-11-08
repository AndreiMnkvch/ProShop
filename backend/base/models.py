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


class ShippingAddress(models.Model):
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    postal_code = models.IntegerField()
    country = models.CharField(max_length=200)

    def __str__(self):
        return self.address


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shipping_address = models.ForeignKey(ShippingAddress, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=200, blank=True)
    tax_price = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    shipping_price = models.DecimalField(max_digits=7, default=0, decimal_places=2)
    total_price = models.DecimalField(max_digits=7, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(null=True, blank=True)
    paid_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):  
        return str(self.created_at)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    name = models.CharField(max_length=200, blank=True)
    qty = models.IntegerField()
    price = models.DecimalField(max_digits=7, decimal_places=2)
    image = models.ImageField(blank=True)

    def __str__(self):
        return self.name



