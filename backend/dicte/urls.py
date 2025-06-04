from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    UserProfileView,
    DictationListView,
    DictationDetailView,
    DictationAttemptView
)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/profile/', UserProfileView.as_view(), name='profile'),
    path('dictations/', DictationListView.as_view(), name='dictation-list'),
    path('dictations/<int:pk>/', DictationDetailView.as_view(), name='dictation-detail'),
    path('dictations/<int:dictation_id>/attempt/', DictationAttemptView.as_view(), name='dictation-attempt'),
] 