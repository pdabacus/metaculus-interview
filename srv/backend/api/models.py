from django.db import models
import random

ROOM_CODE_MAX_LENGTH = 8
ROOM_CODE_DEFAULT_LENGTH = 6


def generate_code() -> str:
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    found_unique_code = False
    while not found_unique_code:
        code = ("").join(random.choices(alphabet, k=ROOM_CODE_DEFAULT_LENGTH))
        if Room.objects.filter(code=code).count() == 0:
            found_unique_code = True
    return code


# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=ROOM_CODE_MAX_LENGTH, default="", unique=True)
