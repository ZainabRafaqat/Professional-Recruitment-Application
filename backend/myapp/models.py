from django.db import models

User_CHOICES = (
   ('candidate', 'Candidate'),
   ('company', 'Company')
)

class User(models.Model):
    Id = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50,blank=True, null=True)
    organization = models.CharField(max_length=100,blank=True, null=True)
    emailAddress = models.CharField(max_length=100)
    password = models.CharField(max_length=50)
    isUser= models.CharField( choices=User_CHOICES,default= "candidate" , max_length=50,blank=True, null=True)
    imageurl= models.URLField(max_length=255,blank=True,null=True)

    def __str__(self):
        return self.firstName

    class Meta:
        ordering = ['Id']
        
class Company(models.Model):
    name = models.CharField(max_length=50)
    emailAddress = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=50,blank=True, null=True)
    logoUrl= models.URLField(max_length=255,blank=True,null=True)
    website= models.URLField(max_length=255,blank=True,null=True)
    password = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    class Meta:
        ordering = ['id']
#region Test   
class Test(models.Model):
    id = models.AutoField(primary_key=True)
    test_Name = models.CharField(max_length=255)
    description = models.TextField()
    total_Time_for_Test_in_Minutes = models.IntegerField()
    deadline = models.DateField(auto_now=False, auto_now_add=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    def __str__(self):
        return self.test_Name
    class Meta:
        ordering = ['id']
             
class TestStatement(models.Model):
    id = models.AutoField(primary_key=True)
    testId= models.ForeignKey(Test, on_delete=models.CASCADE,related_name='statements')
    statement = models.CharField(max_length=255)
    testOption = models.BooleanField(default=False)
    compiler = models.BooleanField(default=False)
    option1 = models.CharField(null=True, blank=True,max_length=255)
    option2 = models.CharField(null=True, blank=True,max_length=255)
    option3 = models.CharField(null=True, blank=True,max_length=255)
    option4 = models.CharField(null=True, blank=True,max_length=255)
    correct_answer = models.CharField(null=True, blank=True,max_length=255,help_text="Be careful while adding answer. It should match the option exacty")
    
    def __str__(self):
        return self.statement
    class Meta:
        ordering = ['testId']

             
class TestCase(models.Model):
    testStatement= models.ForeignKey(TestStatement, on_delete=models.CASCADE,related_name="testCases")
    hidden = models.BooleanField(default=False)
    input = models.CharField(null=True, blank=True,max_length=255)
    output = models.CharField(null=True, blank=True,max_length=255)
    class Meta:
        ordering = ['id']


class TestAns(models.Model):
    id = models.AutoField(primary_key=True)
    TestId = models.ForeignKey(Test, on_delete=models.CASCADE)
    QId = models.ForeignKey(TestStatement, on_delete=models.CASCADE)
    # UserId = models.ForeignKey(User, on_delete=models.CASCADE)
    Answer = models.CharField(max_length=5000)

    class Meta:
        ordering = ['TestId']

    

    
#endregion

#region Job Models
JOB_TYPE=(
    ("Full-Time","Full-Time"),
    ("Part-Time","Part-Time"),
    ("Internship","Internship"),
)
CURRENCY_TYPE=(
    ("Rs/-","Rs/-"),
    ("$","$"),
    ("€","€"),
)
SALARY_TYPE=(
    ("Per Year","Per Year"),
    ("Per Month","Per Month"),
   
)

class Job(models.Model):
    id=models.AutoField(primary_key=True)
    title=models.CharField(max_length=255,)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    description=models.TextField()
    working_hours=models.IntegerField()
    tests=models.ManyToManyField(Test,related_name="jobs")
    salary=models.IntegerField()
    salarytype=models.CharField(
        choices=SALARY_TYPE,
        default="per year",
        max_length=255,

    )
    currency=models.CharField(
        choices=CURRENCY_TYPE,
        default="rupee",
        max_length=255,

    )

    jobtype=models.CharField(
        max_length = 20,
        choices=JOB_TYPE,
        default="full-time",
    )
    class Meta:
        ordering=['id']
        
    def __str__(self):
         return self.title

class JobApply(models.Model):
    
    Job = models.ForeignKey(Job,null=True,blank=True, on_delete=models.CASCADE)
    Test = models.ForeignKey(Test, on_delete=models.CASCADE)
    User = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
   
STATUS_APPLICATION=(

    ("Completed","Completed"),
    ("Started","Started"),
    ("InProgress","InProgress")
)

class Company_details(models.Model):
   id=models.AutoField(primary_key=True)
   company_name=models.CharField(max_length=255)
   address=models.TextField()
   #addition of tests added by this company
   #addition of jobs posted by this company
   Job = models.ForeignKey(Job,null=True,blank=True, on_delete=models.CASCADE)
#endregion  iI

class Total_Applications(models.Model):
    id=models.AutoField(primary_key=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)

    title = models.ForeignKey(Job,blank=True,on_delete=models.CASCADE,null=True, related_name ='job')
    test = models.ForeignKey(Test,on_delete=models.CASCADE,null=True)
    Status= models.TextField( choices=STATUS_APPLICATION,
        default="Started",
        max_length=255,)
    
class AppliedJobs(models.Model):
    
    Job = models.ForeignKey(Job, on_delete=models.CASCADE)
    User = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    Status= models.TextField( choices=STATUS_APPLICATION,
        default="Started",
        max_length=255,)
    ResultPercentage=models.IntegerField(null=True,blank=True)

    def __str__(self):
        return self.Job.title
    
     
class TestResult(models.Model):
    
    Job = models.ForeignKey(Job,null=True,blank=True, on_delete=models.CASCADE)#this will be removed
    Jobs = models.ForeignKey(AppliedJobs,null=True,blank=True, on_delete=models.CASCADE)
    Test = models.ForeignKey(Test, on_delete=models.CASCADE)
    User = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    result = models.IntegerField()
    time_started=models.DateTimeField()
    time_ended=models.DateTimeField()

