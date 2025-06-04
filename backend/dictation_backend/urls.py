from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
import logging

logger = logging.getLogger(__name__)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('dictation.urls')),  # Les URLs de l'app dictation sont sous /api/
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Log des URLs au démarrage
logger.info("URLs principales:")
for url in urlpatterns:
    logger.info(f"- {url.pattern}") 