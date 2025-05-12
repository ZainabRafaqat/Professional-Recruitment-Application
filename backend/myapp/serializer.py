from rest_framework import serializers
from .models import *

#region Extra
# class StudentSerializers(serializers.ModelSerializer):
#     class Meta:
#         model=Student
#         fields='__all__'

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'

class CompanySerializers(serializers.ModelSerializer):
    class Meta:
        model=Company
        fields='__all__'

#endregion

#region Test
class TestSerializers(serializers.ModelSerializer):
    class Meta:
        model=Test
        fields='__all__'

class TestStatementSerializers(serializers.ModelSerializer):
    class Meta:
        model=TestStatement
        fields='__all__'
     
class TestCaseSerializers(serializers.ModelSerializer):
    class Meta:
        model=TestCase
        fields='__all__'
        
class TestAnsSerializers(serializers.ModelSerializer):
    class Meta:
        model=TestAns
        fields='__all__'
 
#endregion

#region Job Models
class JobSerializers(serializers.ModelSerializer):
    class Meta:
        model=Job
        fields='__all__'
class AppliedJobsSerializers(serializers.ModelSerializer):
    class Meta:
        model=AppliedJobs
        fields='__all__'
#endregion
     
class TestResultSerializers(serializers.ModelSerializer):
    class Meta:
        model=TestResult
        fields='__all__'

class Total_ApplicationsSerializers(serializers.ModelSerializer):
    class Meta:
        model=Total_Applications
        fields='__all__'       