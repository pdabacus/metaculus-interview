from rest_framework import serializers
from .models import Chart


class ChartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chart
        fields = ("id", "chart_name", "chart_id", "chart_data")
