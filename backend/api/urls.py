from django.urls import path
from .views import (
    JobList,
    JobDetail,
    Shutdown,
    Reboot,
    TurnOnDisplay,
    TurnOffDisplay,
    UpdateCrontab,
)
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("job/", JobList.as_view()),
    path("job/<int:pk>/", JobDetail.as_view()),
    path("shutdown/", Shutdown.as_view()),
    path("reboot/", Reboot.as_view()),
    path("turn-on-display/", TurnOnDisplay.as_view()),
    path("turn-off-display/", TurnOffDisplay.as_view()),
    path("update-cron-jobs/", UpdateCrontab.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
