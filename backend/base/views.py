from datetime import datetime

from django.shortcuts import get_object_or_404

from rest_framework import status 
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response 
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from base.serializers import ProductSerializer, OrderSerializer, ReviewSerializer
from base.models import Product, Order, Review


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()    
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.action == 'list':
            keyword = self.request.query_params.get('keyword')
            if keyword:
                queryset = queryset.filter(name__icontains=keyword)
        return queryset

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
        return Response("Image has been successfully uploaded", status=status.HTTP_200_OK)
        


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Order.objects.all()

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)

    def list(self, request):
        queryset = self.get_queryset(self)
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        queryset = self.get_queryset(self)
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
    
    @action(detail=True, methods=['patch'], url_path="deliver", permission_classes=[IsAdminUser])
    def update_order_to_delivered(self, request, pk=None):
        order = self.get_object()
        order.is_delivered = True
        order.delivered_at = datetime.now()
        order.save()
        return Response("Succesfully updated to delivered", status=status.HTTP_200_OK)


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Review.objects.all()

    def create(self, request):
        data = self.request.data
        user = self.request.user

        try:
            product_id = data.get("productId")
        except KeyError:
            return Response("No productId in request", status=status.HTTP_400_BAD_REQUEST)
        product = Product.objects.get(id=product_id)
        already_exists = Review.objects.filter(product=product).filter(user=user).exists()

        if already_exists:
            return Response("You have been reviewed this product yet", status=status.HTTP_400_BAD_REQUEST)
        elif data['rating'] == 0:
            return Response("Please select a rating", status=status.HTTP_400_BAD_REQUEST)
        
        else:
            review = Review.objects.create(
                product=product,    
                user=user,
                name=user.first_name,
                rating=data['rating'],
                comment=data['comment']
            )
            reviews = Review.objects.filter(product=product_id)
            product.numReviews = reviews.count()            
            total = 0
            for i in reviews:
                total += i.rating
            product.rating = total/len(reviews)
            product.save()
            return Response("Review has been successfully added. Thanks", status=status.HTTP_201_CREATED)