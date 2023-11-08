from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

from base.serializers import ProductSerializer
from base.serializers import OrderSerializer
from .models import Product
from .models import Order


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()    
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)
