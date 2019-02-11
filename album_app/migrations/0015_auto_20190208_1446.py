# Generated by Django 2.1.3 on 2019-02-08 14:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('album_app', '0014_comment_avatar'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='avatar',
            name='client',
        ),
        migrations.AddField(
            model_name='avatar',
            name='album',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='avatars', to='album_app.Album'),
        ),
    ]