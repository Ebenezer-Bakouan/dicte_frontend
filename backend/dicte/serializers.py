from rest_framework import serializers
from .models import User, Dictation, DictationAttempt

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'role', 'last_login')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['email'],
            password=validated_data['password']
        )
        return user

class DictationSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Dictation
        fields = '__all__'

class DictationAttemptSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    dictation = DictationSerializer(read_only=True)

    class Meta:
        model = DictationAttempt
        fields = '__all__' 