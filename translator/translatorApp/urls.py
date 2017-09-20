from django.conf.urls import include, url
from .views import PhraseViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'phrases', PhraseViewSet)

urlpatterns = [
	url(r'^', include(router.urls)),
]
