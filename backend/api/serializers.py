from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Transaction, FinancialRecord

class UserSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        fields = [
            "id",
            "username",
            "password",
        ]
        extra_kwargs = {"password":{"write_only":True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.Serializer):
    class Meta():
        model = Note
        fields = [
            "id",
            "title",
            "content",
            "created_at"
            "author",
        ]
        extra_kwargs = {"author":{"read_only": True}}

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '_all_'
        read_only_fields = ('financial_record', 'date')

class FinancialRecordSerializer(serializers.ModelSerializer):
    transactions = TransactionSerializer(many=True, read_only=True)

    class Meta:
        model = FinancialRecord
        fields = '__all__'  # Corrected from '_all_' to '__all__'
        read_only_fields = ('investments_amount', 'savings_amount', 'user', 'created_at', 'remaining_budget')
