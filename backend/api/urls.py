from django.urls import path
from . import views
from django.urls import path
from .views import QuestionListCreate, AnswerListCreate, QuestionDetail, QuestionStatistics

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path('questions/', QuestionListCreate.as_view(), name='question-list-create'),
    path('questions/<int:pk>/', QuestionDetail.as_view(), name='question-detail'),
    path('questions/<int:pk>/statistics/', QuestionStatistics.as_view(), name='question-statistics'),
    path('answers/', AnswerListCreate.as_view(), name='answer-create'),
    # path('answers/<int:pk>', AnswerListCreate.as_view(), name='answer-create'),

]