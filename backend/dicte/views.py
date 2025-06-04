from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Dictation, DictationAttempt
from .serializers import UserSerializer, DictationSerializer, DictationAttemptSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'token': str(refresh.access_token),
                'user': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            user.last_login = timezone.now()
            user.save()
            return Response({
                'token': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
        return Response({'message': 'Email ou mot de passe incorrect'}, status=status.HTTP_401_UNAUTHORIZED)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class DictationListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DictationSerializer

    def get_queryset(self):
        return Dictation.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class DictationDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DictationSerializer
    queryset = Dictation.objects.all()

class DictationAttemptView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, dictation_id):
        try:
            dictation = Dictation.objects.get(id=dictation_id)
            attempt = DictationAttempt.objects.create(
                user=request.user,
                dictation=dictation,
                score=request.data.get('score'),
                errors=request.data.get('errors', [])
            )
            return Response(DictationAttemptSerializer(attempt).data, status=status.HTTP_201_CREATED)
        except Dictation.DoesNotExist:
            return Response({'message': 'Dictée non trouvée'}, status=status.HTTP_404_NOT_FOUND) 