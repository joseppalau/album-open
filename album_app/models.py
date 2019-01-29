from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here.


class Album(models.Model):
    client = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title


class Image(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='images')
    width = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    image = models.ImageField(null=False, blank=False, width_field='width', height_field='height')
    title = models.CharField(max_length=200)
    date_created = models.DateField(default=timezone.now)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-date_created']

