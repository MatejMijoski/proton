from rest_framework import mixins, viewsets

from crm.models import Order, ProductOrder
from crm.serializers import OrderSerializer, ProductOrderSerializer


class OrdersAPI(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = ProductOrder.objects.all()
    serializer_class = ProductOrderSerializer
