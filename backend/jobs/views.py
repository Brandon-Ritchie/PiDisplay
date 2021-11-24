from .models import Job
from .serializers import JobSealizer
from rest_framework import generics

# Create your views here.
class JobListCreate(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSealizer
