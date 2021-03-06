# Generated by Django 2.1.7 on 2019-03-21 12:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('album_app', '0024_album'),
    ]

    operations = [
        migrations.AddField(
            model_name='avatar',
            name='album',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='avatars', to='album_app.Album'),
        ),
        migrations.AddField(
            model_name='image',
            name='album',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='album_app.Album'),
        ),
    ]
