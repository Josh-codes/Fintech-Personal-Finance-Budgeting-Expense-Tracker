from django.urls import path
from . import views

urlpatterns =[
    path("notes/", views.CreateNotelist.as_view(), name="note_list"),
    path("notes/delete/<int:pk>", views.DeleteNote.as_view(), name="delete_note"),
]