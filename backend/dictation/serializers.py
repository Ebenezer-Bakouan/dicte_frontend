from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Dictation, DictationAttempt

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class DictationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dictation
        fields = ['id', 'title', 'text', 'difficulty', 'created_at', 'audio_file', 'audio_url']

class DictationAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = DictationAttempt
        fields = ['id', 'dictation', 'user_text', 'score', 'feedback', 'created_at']
        read_only_fields = ['score', 'feedback'] 