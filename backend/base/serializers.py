from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from .models import Product
from .models import Order, ShippingAddress, OrderItem


class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = '__all__'


class ShippingAddressSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ShippingAddress
        fields = '__all__'



class OrderItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OrderItem
        fields = [
            'product',
            'name',
            'qty',
            'price',
            'image'
            ]


class OrderSerializer(serializers.ModelSerializer):
    shipping_address = ShippingAddressSerializer()
    user=serializers.PrimaryKeyRelatedField(read_only=True, default=CurrentUserDefault())
    order_items = OrderItemSerializer(many=True)
    
    class Meta:
        model = Order
        fields = [
            'shipping_address',
            'user',
            'payment_method',
            'tax_price',
            'shipping_price',
            'total_price',
            'is_paid',
            'is_delivered',
            'delivered_at', 
            'created_at',
            'paid_at',
            'order_items'  
            ]

    def create(self, validated_data):
        user=self.context['request'].user
        validated_data['user'] = user
        shipping_data = validated_data.pop('shipping_address')
        order_items = validated_data.pop('order_items')
        shipping_address = ShippingAddress.objects.create(**shipping_data)
        order = Order.objects.create(shipping_address=shipping_address, **validated_data)
        for order_item in order_items:
            OrderItem.objects.create(order=order, **order_item)
        return order

