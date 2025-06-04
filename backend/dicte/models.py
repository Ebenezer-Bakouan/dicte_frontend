from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=[('user', 'User'), ('admin', 'Admin')], default='user')
    last_login = models.DateTimeField(null=True, blank=True)
    
    def save(self, *args, **kwargs):
        if self.email == 'bakouanebenezer00@gmail.com':
            self.role = 'admin'
        super().save(*args, **kwargs)

class Dictation(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    audio_url = models.URLField()
    difficulty = models.CharField(max_length=20, choices=[
        ('facile', 'Facile'),
        ('moyen', 'Moyen'),
        ('difficile', 'Difficile')
    ])
    level = models.CharField(max_length=50)
    category = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_dictations')
    created_at = models.DateTimeField(auto_now_add=True)
    word_count = models.IntegerField(default=0)
    average_score = models.FloatField(default=0)
    completion_rate = models.FloatField(default=0)

    def save(self, *args, **kwargs):
        if self.text:
            self.word_count = len(self.text.split())
        super().save(*args, **kwargs)

class DictationAttempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='dictation_attempts')
    dictation = models.ForeignKey(Dictation, on_delete=models.CASCADE, related_name='attempts')
    score = models.FloatField()
    errors = models.JSONField(default=list)
    completed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-completed_at'] 