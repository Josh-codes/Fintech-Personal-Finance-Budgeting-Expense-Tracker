from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError

from .models import Note, FinancialRecord, Transaction
from .serializers import UserSerializer, NoteSerializer, FinancialRecordSerializer, TransactionSerializer

# User Registration
class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# Create Financial Record
class CreateFinancialRecord(generics.CreateAPIView):
    queryset = FinancialRecord.objects.all()
    serializer_class = FinancialRecordSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Add Transaction
class AddTransaction(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        financial_record_id = self.request.data.get('financial_record')
        try:
            financial_record = FinancialRecord.objects.get(id=financial_record_id, user=self.request.user)
        except FinancialRecord.DoesNotExist:
            raise ValidationError("Financial Record not found or you don't have permission.")
        
        serializer.save(financial_record=financial_record)

# Delete Transaction
class DeleteTransaction(generics.DestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only allow deletion of user's transactions
        return Transaction.objects.filter(financial_record__user=self.request.user)
    
class FetchFinancialRecordView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def post(self, request, *args, **kwargs):
        # You can customize this to filter records based on user or other parameters
        financial_records = FinancialRecord.objects.filter(user=request.user)  # Assuming you want to fetch the records of the logged-in user
        serializer = FinancialRecordSerializer(financial_records, many=True)
        return Response(serializer.data)