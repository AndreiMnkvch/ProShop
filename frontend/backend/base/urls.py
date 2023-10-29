from rest_framework import routers
from base.views import ProductViewSet


router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
urlpatterns = router.urls
