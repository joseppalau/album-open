# Generated by Django 2.1.5 on 2019-02-12 10:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('album_app', '0015_auto_20190208_1446'),
    ]

    operations = [
        migrations.CreateModel(
            name='Value',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grade', models.CharField(max_length=100)),
                ('avatar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='grades', to='album_app.Avatar')),
                ('image', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='grades', to='album_app.Image')),
            ],
        ),
    ]
