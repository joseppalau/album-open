# Generated by Django 2.1.3 on 2019-02-07 13:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('album_app', '0013_auto_20190207_1111'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='avatar',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='album_app.Avatar'),
        ),
    ]
