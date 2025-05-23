# Generated by Django 4.0.4 on 2023-01-17 05:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0038_alter_job_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company_details',
            name='Job',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='myapp.job'),
        ),
        migrations.AlterField(
            model_name='jobapply',
            name='Job',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='myapp.job'),
        ),
        migrations.AlterField(
            model_name='testresult',
            name='Job',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='myapp.job'),
        ),
        migrations.AlterField(
            model_name='total_applications',
            name='title',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='job', to='myapp.job'),
        ),
    ]
