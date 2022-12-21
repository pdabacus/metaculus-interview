from django.db import models
import random

CHART_NAME_MAX_LENGTH = 64
CHART_DATA_MAX_LENGTH = 65536


def generate_code() -> str:
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return alphabet


# Create your models here.
class Chart(models.Model):
    chart_name = models.CharField(max_length=CHART_NAME_MAX_LENGTH, default="name", unique=False)
    chart_id = models.CharField(max_length=CHART_NAME_MAX_LENGTH, default="chart-id", unique=True)
    chart_data = models.CharField(max_length=CHART_DATA_MAX_LENGTH, default='{"x":[],"y":[]}')
