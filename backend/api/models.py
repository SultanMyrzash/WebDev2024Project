from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

class Question(models.Model):
    text = models.CharField(max_length=255)
    correct_answer = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions')

class Answer(models.Model):
    answer_text = models.CharField(max_length=255)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    is_correct = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='answers')
    

    def save(self, *args, **kwargs):
        self.is_correct = self.answer_text == self.question.correct_answer
        super().save(*args, **kwargs)
