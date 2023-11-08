from rest_framework import routers
from base.views import ProductViewSet, OrderViewSet


router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)
urlpatterns = router.urls
