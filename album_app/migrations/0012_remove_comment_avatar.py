# Generated by Django 2.1.3 on 2019-02-06 18:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('album_app', '0011_avatar_activated'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='avatar',
        ),
    ]
