from django.shortcuts import render
from django.contrib.staticfiles.views import serve


def favicon(request):
    return serve(request, 'favicon.ico')


def logo(request):
    return serve(request, 'logo192.png')


def home(request):
    return render(request, "index.html")
