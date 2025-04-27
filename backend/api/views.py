from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import UserSerializer, NoteSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.
class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CreateNotelist(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes =[IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class DeleteNote(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes =[IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)