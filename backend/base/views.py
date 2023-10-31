from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from base.serializers import ProductSerializer
from .models import Product


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()    
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)
