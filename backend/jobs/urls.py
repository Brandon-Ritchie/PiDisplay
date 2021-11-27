from django.urls import path
from .views import JobList, JobDetail
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [path("", JobList.as_view()), path("<int:pk>/", JobDetail.as_view())]

urlpatterns = format_suffix_patterns(urlpatterns)
