from django.contrib import admin
from django.urls import include, path, re_path
from django.shortcuts import render


def render_react(request):
    return render(request, "index.html")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/job/", include("jobs.urls")),
    re_path(r"^$", render_react),
    re_path(r"^(?:.*)/?$", render_react),
]
