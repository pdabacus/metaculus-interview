import sys
from django.test import TestCase
from . import models
# Create your tests here.


class ModelsTest(TestCase):
    def test_generate_code(self):
        print("test_generate_code", file=sys.stderr)
        rand_code = models.generate_code()
        self.assertEquals(type(rand_code), str, "return type not str")
        self.assertEquals(len(rand_code), models.ROOM_CODE_DEFAULT_LENGTH, "wrong length code")
