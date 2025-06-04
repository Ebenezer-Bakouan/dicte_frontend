import os
import logging
from django.core.wsgi import get_wsgi_application

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dictation_backend.settings')

logger.info("Démarrage de l'application Django...")
application = get_wsgi_application()
logger.info("Application Django démarrée avec succès!") 