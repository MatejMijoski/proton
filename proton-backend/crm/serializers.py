from rest_framework import serializers

from crm.models import Order, Product, Customer, ProductOrder


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()

    class Meta:
        model = Order
        fields = "__all__"


class ProductOrderSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    order = OrderSerializer()

    class Meta:
        model = ProductOrder
        fields = "__all__"
