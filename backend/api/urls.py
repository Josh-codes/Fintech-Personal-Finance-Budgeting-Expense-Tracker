from django.urls import path
from .views import CreateUser, CreateFinancialRecord, AddTransaction, DeleteTransaction,FetchFinancialRecordView
from . import views

urlpatterns =[
    path('financial-records/', CreateFinancialRecord.as_view(), name='create-financial-record'),
    path('transactions/', AddTransaction.as_view(), name='add-transaction'),
    path('transactions/<int:pk>/', DeleteTransaction.as_view(), name='delete-transaction'),
    path('fetch-financial-record/', FetchFinancialRecordView.as_view(), name='fetch-financial-record'),
]