from django.urls import path
from .views import get_route, get_products, get_product
urlpatterns = [
    path('', get_route, name="routes"),
    path('products/', get_products, name="products"),
    path('products/<int:pk>', get_product, name="product")
]