from django.contrib import admin
from .models import Image, Album, Avatar, Comment

# Register your models here.
class AlbumAdmin(admin.ModelAdmin):
    list_display = ['title', 'client',]

    class Meta:
        model = Album


class ImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'album']

    class Meta:
        model = Image


class AvatarAdmin(admin.ModelAdmin):
    list_display = ['name']

    class Meta:
        model = Avatar


class CommentAdmin(admin.ModelAdmin):
    list_display = ['text', 'date', 'avatar']

    class Meta:
        model = Comment


admin.site.register(Album, AlbumAdmin)
admin.site.register(Image, ImageAdmin)
admin.site.register(Avatar, AvatarAdmin)
admin.site.register(Comment, CommentAdmin)

