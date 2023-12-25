from django.contrib import admin

from crm.models import Product, Order, Customer, ProductOrder

class BaseAdmin(admin.ModelAdmin):
    list_display = ('id', 'external_id', 'name')

class ProductAdmin(BaseAdmin):
    pass

class CustomerAdmin(BaseAdmin):
    pass

admin.site.register(Product, ProductAdmin)
admin.site.register(Customer, CustomerAdmin)

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'external_id', 'customer_id')

admin.site.register(Order, OrderAdmin)

class ProductOrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'product_id', 'order_id')

admin.site.register(ProductOrder, ProductOrderAdmin)
