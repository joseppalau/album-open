from django.contrib import admin
from .models import Image, Album, Avatar, Comment, Value, Profile

# Register your models here.
class AlbumAdmin(admin.ModelAdmin):
    list_display = ['title']

    class Meta:
        model = Album


class ImageAdmin(admin.ModelAdmin):
    list_display = ['title']

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


class ValueAdmin(admin.ModelAdmin):
    list_display = ['grade', 'image', 'avatar']

    class Meta:
        model = Value


class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user']

    class Meta:
        model = Profile


admin.site.register(Album, AlbumAdmin)
admin.site.register(Image, ImageAdmin)
admin.site.register(Avatar, AvatarAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Value, ValueAdmin)
admin.site.register(Profile, ProfileAdmin)

