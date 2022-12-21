# from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .models import Chart
from .serializers import ChartSerializer


# Create your views here.
def boop(request):
    Chart.objects.create(chart_name="Gaussian", chart_id="gaussian", chart_data='{"x":[0,1], "y":[2,3]}')
    return HttpResponse(request, "<h1>boop</h1>")


class ChartViewAll(generics.ListAPIView):
    queryset = Chart.objects.all()
    serializer_class = ChartSerializer


class ChartViewAdd(generics.UpdateAPIView):
    queryset = Chart.objects.all()
    serializer_class = ChartSerializer
