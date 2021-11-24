from django.db import models

# Create your models here.
class Job(models.Model):
    date = models.CharField(max_length=10)
    start_time = models.CharField(max_length=5)
    end_time = models.CharField(max_length=5)
    link = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
