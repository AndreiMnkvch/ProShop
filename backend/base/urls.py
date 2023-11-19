from rest_framework import routers
from base.views import ProductViewSet, OrderViewSet, ReviewViewSet


router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = router.urls
