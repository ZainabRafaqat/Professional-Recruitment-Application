# Generated by Django 4.0.4 on 2023-01-17 05:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0036_alter_company_details_job'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company_details',
            name='Job',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.job'),
        ),
    ]
