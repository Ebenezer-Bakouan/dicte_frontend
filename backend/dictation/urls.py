from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from . import auth_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Routes d'authentification
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', auth_views.register_user, name='register'),
    path('auth/profile/', auth_views.get_user_profile, name='profile'),
    path('auth/login/', auth_views.login_user, name='login'),
    
    # Routes existantes
    path('dictation/generate/', views.generate_dictation_view, name='generate_dictation'),
    path('dictation/correct/', views.correct_dictation_view, name='correct_dictation'),
    # path('dictations/', views.dictation_list, name='dictation-list'),
    # path('dictations/<int:pk>/', views.dictation_detail, name='dictation-detail'),
    # path('dictations/<int:pk>/attempt/', views.create_attempt, name='create-attempt'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Pour le débogage
print("URLs de l'app dictation:")
for url in urlpatterns:
    print(f"- {url.pattern}") 