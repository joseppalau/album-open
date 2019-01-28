from django.contrib import admin
from .models import Image, Album

# Register your models here.
class AlbumAdmin(admin.ModelAdmin):
    list_display = ['title', 'client']

    class Meta:
        model = Album


class ImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'date_created']

    class Meta:
        model = Image


admin.site.register(Album, AlbumAdmin)
admin.site.register(Image, ImageAdmin)
