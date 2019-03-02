# Generated by Django 2.1.3 on 2019-02-06 10:56

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('album_app', '0009_avatar_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='avatar',
            name='height',
            field=models.IntegerField(default=50),
        ),
        migrations.AddField(
            model_name='avatar',
            name='photo',
            field=models.ImageField(default=django.utils.timezone.now, height_field='height', upload_to='', width_field='width'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='avatar',
            name='width',
            field=models.IntegerField(default=50),
        ),
    ]
