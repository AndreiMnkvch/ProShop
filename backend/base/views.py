from datetime import datetime

from django.shortcuts import get_object_or_404

from rest_framework import status 
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response 
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from base.serializers import ProductSerializer
from base.serializers import OrderSerializer
from .models import Product
from .models import Order


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()    
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

    def get_permissions(self):
        if self.action in ('create', 'destroy'):
                permission_classes = [IsAdminUser]
        elif self.action in ( 'list', 'retrieve'):
                permission_classes = [AllowAny]
        else:
                permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    @action(detail=True, methods=['patch'])
    def upload_image(self, request, pk):
        product = self.get_object()
        try:
            image = request.data['image']
        except KeyError:
            return Response("Image wasn't provided in the request", status=status.HTTP_400_BAD_REQUEST)
        product.image = image
        product.save()
        return Response("imaage has been successfully uploaded", status=status.HTTP_200_OK)
        


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        queryset = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        queryset = Order.objects.filter(user=request.user)
        order = get_object_or_404(queryset, pk=pk)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['patch'], url_path="pay")
    def update_order_to_paid(self, request, pk=None):
        order = self.get_object()
        order.is_paid = True
        order.paid_at = datetime.now()
        order.save()
        return Response("Succesfully updated to paid", status=status.HTTP_200_OK)
