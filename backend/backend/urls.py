"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from myapp.views import *
# from django.conf.urls import url 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/',getUsers),
    re_path(r'^getTestsbyCompany/(?P<pk>[0-9]+)$',getTestsbyCompany,name="TestsbyCompany"),
    path('tests/',getTests),
    path('saveUser/',addUser),
    path('saveTest/',addTest),
    path('saveTestResults/',addTestResults),
    path('saveTestAns/',addTestAns),
    path('validateUser/',validateUser),
    path('validateCompany/',validateCompany),
    path('saveCompany/',addCompany),
    path('getJobs/',getJobs),
    re_path(r'^getAppliedJobs/(?P<pk>[0-9]+)$',getAppliedJobs),
    path('saveJob/',addJob),
    re_path(r"^getTestbyId/(?P<pk>[0-9]+)$", getTestbyId, name="TestbyId"),
    re_path(r"^getTestbyJob/(?P<pk>[0-9]+)$", getTestbyJob, name="TestbyJob"),
     re_path(r"^getUserbyId/(?P<pk>[0-9]+)$", getUserbyId, name="getUserbyId"),
     re_path(r"^getCompanybyId/(?P<pk>[0-9]+)$", getCompanybyId, name="getCompanybyId"),
    re_path(r"^getJobsbyuserId/(?P<pk>[0-9]+)$", getJobsbyuserId, name="getJobsbyuserId"),
    re_path(r"^getresultbyuserId/(?P<pk>[0-9]+)$", getresultbyuserId, name="getresultbyuserId"),
    path("getTestResult/", getTestResult, name="getTestResult"),
    re_path(r"^getJobsbyId/(?P<pk>[0-9]+)$", getJobsbyId, name="getJobsbyId"),
    path('editJobs/', editJob),
    path('editTest/', updateTest),
    re_path(r"^deleteTest/(?P<pk>[0-9]+)$",deleteTest),
    re_path(r"^deleteJob/(?P<pk>[0-9]+)$",deleteJob),
    path('saveJobApply/',addJobApply),
    path('saveJobAppliedByUser/',addJobAppliedbyUser),
    path('jobApplyCheck/',jobApplyCheck),
    path('testAttemptCheck/',testAttemptCheck),
    re_path(r"^getJobsbyCompany/(?P<pk>[0-9]+)$",getJobByUserID, name="JobbyCompany"),
    re_path(r"^getStatusbyJob/(?P<pk>[0-9]+)$",getStatusbyJob, name="StatusbyJob"),
    re_path(r"^getStatusInNumber/(?P<pk>[0-9]+)$",countStatus, name="CountStatus"),
    path('details_job/',getallPostedJobs)
]


admin.site.site_header = 'My App'
admin.site.site_title = 'My App'
