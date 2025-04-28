from django.db import models
from django.contrib.auth.models import User
from django.db.models import Sum
from django.core.exceptions import ValidationError

class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="note")

    def _str_(self):
        return self.title

class FinancialRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    occupation = models.CharField(max_length=200)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    investments_pct = models.DecimalField(max_digits=5, decimal_places=2)
    savings_pct = models.DecimalField(max_digits=5, decimal_places=2)
    investments_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    savings_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    remaining_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.investments_amount = (self.salary * self.investments_pct) / 100
        self.savings_amount = (self.salary * self.savings_pct) / 100
        self.remaining_balance = self.budget
        super().save(*args, **kwargs)

    def _str_(self):
        return f"{self.name}'s Financial Record"

class Transaction(models.Model):
    financial_record = models.ForeignKey(FinancialRecord, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50)
    is_credit = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)

    def clean(self):
        if not self.is_credit:
            if self.amount > self.financial_record.remaining_balance:
                raise ValidationError("Transaction exceeds remaining budget.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
        if not self.is_credit:
            self.financial_record.remaining_balance -= self.amount
        else:
            self.financial_record.remaining_balance += self.amount
        self.financial_record.save()

    def delete(self, *args, **kwargs):
        if not self.is_credit:
            self.financial_record.remaining_balance += self.amount
        else:
            self.financial_record.remaining_balance -= self.amount
        self.financial_record.save()
        super().delete(*args, **kwargs)

    def _str_(self):
        return f"{'Credit' if self.is_credit else 'Debit'}: {self.amount} ({self.category})"