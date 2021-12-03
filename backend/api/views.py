from .models import Job
from .serializers import JobSerializer, UserSerializer
from rest_framework import generics, permissions
from rest_framework.views import APIView
from django.http import HttpResponse
import os
from django.contrib.auth.models import User

# Create your views here.
class JobList(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]


class JobDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class Shutdown(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        os.system("sudo shutdown -h now")
        return HttpResponse()


class Reboot(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        os.system("sudo reboot")
        return HttpResponse()


class TurnOnDisplay(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        os.system('echo "on 0.0.0.0" | cec-client -s -d 1')
        return HttpResponse()


class TurnOffDisplay(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        os.system('echo "standby 0.0.0.0" | cec-client -s -d 1')
        return HttpResponse()
