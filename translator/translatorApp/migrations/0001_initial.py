# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-19 02:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Phrase',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=255)),
                ('language', models.CharField(max_length=10)),
                ('translation', models.CharField(max_length=255)),
            ],
        ),
    ]
