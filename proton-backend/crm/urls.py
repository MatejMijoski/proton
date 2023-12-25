from rest_framework import routers

from crm import views

crm_router = routers.SimpleRouter()
crm_router.register("orders", views.OrdersAPI)
