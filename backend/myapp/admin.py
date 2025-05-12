from django.contrib import admin

from .models import *

#region Test 
class TestAdmin(admin.ModelAdmin):
    list_display = ['id','test_Name','company', 'total_Time_for_Test_in_Minutes','deadline']
admin.site.register(Test,TestAdmin)

class TestStatementAdmin(admin.ModelAdmin):
    list_display = ['id','testId', 'statement','testOption','compiler', 'option1', 'option2', 'option3', 'option4','correct_answer']
admin.site.register(TestStatement,TestStatementAdmin)

class TestCaseAdmin(admin.ModelAdmin):
    list_display = ['id','testStatement', 'hidden','input', 'output']
admin.site.register(TestCase,TestCaseAdmin)


class TestAnsAdmin(admin.ModelAdmin):
    list_display = ['id','TestId', 'QId', 'Answer']
admin.site.register(TestAns, TestAnsAdmin)    

#endregion

#region Job Model
class JobAdmin(admin.ModelAdmin):
    list_display = ['id','title', 'company','working_hours','salary','salarytype','currency','jobtype']
admin.site.register(Job,JobAdmin)
#endregion

class TestResultAdmin(admin.ModelAdmin):
    list_display = ['id','Job','Test','User', 'result', 'time_started','time_ended']
admin.site.register(TestResult, TestResultAdmin)    


#region Extra

# class StudentAdmin(admin.ModelAdmin):
#     list_display = ['sid', 'name', 'roll_no']
# admin.site.register(Student, StudentAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display = ['Id', 'firstName', 'lastName','organization', 'emailAddress', 'password','isUser','imageurl']
    radio_fields = {'isUser': admin.VERTICAL}
admin.site.register(User, UserAdmin)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'emailAddress', 'location', 'website','logoUrl']
admin.site.register(Company, CompanyAdmin)

class JobApplyAdmin(admin.ModelAdmin):
    list_display = ['id','Job','Test','User']
admin.site.register(JobApply, JobApplyAdmin) 
   
class AppliedJobsAdmin(admin.ModelAdmin):
    list_display = ['id','Job','User', 'Status', 'ResultPercentage']
admin.site.register(AppliedJobs, AppliedJobsAdmin)    


#endregion

class Comapny_detailsAdmin(admin.ModelAdmin):
    list_display= ['id','company_name','address','Job']
admin.site.register(Company_details,Comapny_detailsAdmin)   

 
class Total_ApplicationsAdmin(admin.ModelAdmin):
    list_display = ['id','title','test','user','Status']
admin.site.register(Total_Applications,Total_ApplicationsAdmin)    