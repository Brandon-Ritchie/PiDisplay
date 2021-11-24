from django.urls import path
from .views import JobListCreate

urlpatterns = [path("api/job/", JobListCreate.as_view())]
