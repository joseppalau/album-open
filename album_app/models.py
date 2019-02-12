from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

class Album(models.Model):
    client = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    title = models.CharField(max_length=200)
    max_photos = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    def images_selected(self):
        return self.images.filter(selected=True)


class Image(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='images')
    width = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    photo = models.ImageField(null=False, blank=False, width_field='width', height_field='height')
    title = models.CharField(max_length=200)
    date_created = models.DateField(default=timezone.now)
    selected = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-date_created']


class Avatar(models.Model):
    name = models.CharField(max_length=100)
    album = models.ForeignKey(Album, default=1, on_delete=models.CASCADE, related_name='avatars')
    width = models.IntegerField(default=50)
    height = models.IntegerField(default=50)
    photo = models.ImageField(null=False, blank=False, width_field='width', height_field='height')
    activated = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Comment(models.Model):
    image = models.ForeignKey(Image, on_delete=models.CASCADE, related_name='comments')
    avatar = models.ForeignKey(Avatar, default=1, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.text


class Value(models.Model):
    grade = models.CharField(max_length=100)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, related_name='grades')
    avatar = models.ForeignKey(Avatar, on_delete=models.CASCADE, related_name='grades')

    def __str__(self):
        return self.grade
