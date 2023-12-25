from django.db import models

from base.models import DateAuditModel


class Customer(DateAuditModel):
    external_id = models.CharField(max_length=30)
    name = models.CharField(max_length=200)


class Product(DateAuditModel):
    external_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=500)


class Order(DateAuditModel):
    external_id = models.IntegerField(unique=True)
    date = models.DateField()
    products = models.ManyToManyField(Product, through="ProductOrder")
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

class ProductOrder(DateAuditModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    total_price = models.FloatField()
