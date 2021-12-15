from .models import Job
from .serializers import JobSerializer, UserSerializer
from rest_framework import generics, permissions
from rest_framework.views import APIView
from django.http import HttpResponse
import os
from django.contrib.auth.models import User
from crontab import CronTab

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


class UpdateCrontab(APIView):
    permission_classes = [
        permissions.AllowAny  # needs to be set to IsAuthenticated once Service is set up on front end
    ]

    def get(self, request):
        all_jobs = Job.objects.all()

        cron = CronTab(user="pi")  # access crontab as set user, "pi" for production
        cron.remove_all()

        # Command Variables

        for job in all_jobs:
            on_command = f"echo 'on 0.0.0.0' | cec-client -s -d 1 && echo \"link = '{job.link}'\" > /home/pi/pi-display/run-display/link.py && DISPLAY=:0 python3 /home/pi/pi-display/run-display/run_display.py >> /home/pi/pi-display/pi-display.log 2>&1"
            off_command = (
                "echo 'standby 0.0.0.0' | cec-client -s -d 1 && pkill chromium"
            )

            job_date_split = job.date.split(
                "-"
            )  # [0] is year, [1] is month, [2] is day

            job_start_time_split = job.start_time.split(
                ":"  # [0] is hours, [1] is minutes
            )

            job_end_time_split = job.end_time.split(":")  # [0] is hours, [1] is minutes

            start_job = cron.new(command=on_command)
            start_job.month.on(job_date_split[1])
            start_job.day.on(job_date_split[2])
            start_job.hour.on(job_start_time_split[0])
            start_job.minute.on(job_start_time_split[1])

            end_job = cron.new(command=off_command)
            end_job.month.on(job_date_split[1])
            end_job.day.on(job_date_split[2])
            end_job.hour.on(job_end_time_split[0])
            end_job.minute.on(job_end_time_split[1])

        cron.write()

        return HttpResponse()
