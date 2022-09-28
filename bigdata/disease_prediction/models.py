from django.db import models

# Create your models here.
class Condition(models.Model):
    code=models.CharField(max_length=10)
    condition=models.CharField(max_length=100)

    def __str__(self):
        return self.code