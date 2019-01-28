from django.db import models
from django.utils import timezone
# Create your models here.


class Album(models.Model):
    client = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)


class Image(models.Model):
    album = models.ForeignKey('album_app.Album', on_delete=models.CASCADE, related_name='images')
    width = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    image = models.ImageField(null=False, blank=False, width_field='width', height_field='height')
    title = models.CharField(max_length=200)
    date_created = models.DateField(default=timezone.now)

    def __str__(self):
        self.title

    class Meta:
        ordering = ['-date_created']

