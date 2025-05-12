import json
from django.http import HttpResponse
from .serializer import *
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse


from .models import *

#region extra
# def st_ind(request):
#     students = []
#     data = Student.objects.all()
#     for student in data:
#         student=StudentSerializers(student).data
#         students.append(student)
#     return HttpResponse(json.dumps(students))

# @csrf_exempt
# def addStudent(request):
#     data = request.body
#     data = json.loads(data)

#     name = data['name']
#     roll = data['roll']
#     # print(data)
#     if Student.objects.filter(name = name).exists():
#         return HttpResponse('Student already exists')
#     else:
#         student = Student.objects.create(name=name, roll_no=roll)
#         student.save()
#         return HttpResponse('Student added')

#endregion

#region user
def getUsers(request):
    users = []
    data = User.objects.all()
    for user in data:
        user=UserSerializers(user).data
        users.append(user)
    return HttpResponse(json.dumps(users))

def getUserbyId(request,pk):
    users = []
    data = User.objects.filter(Id=pk)
    for user in data:
        user=UserSerializers(user).data
        users.append(user)
    return HttpResponse(json.dumps(users))
    

def getCompanybyId(request,pk):
    users = []
    data = Company.objects.filter(id=pk)
    for user in data:
        user=CompanySerializers(user).data
        users.append(user)
    return HttpResponse(json.dumps(users))
    

# ---------------------Add User----------------------
@csrf_exempt
def addUser(request):
    data = request.body
    data = json.loads(data)
    firstName = data['firstName']
    lastName = data['lastName']
    emailAddress = data['emailAddress']
    password = data['password']
    # isUser = data['isUser']
    imageurl= data['image']
    if User.objects.filter(emailAddress = emailAddress).exists():
        return HttpResponse('User already exists')
    else:
        user = User.objects.create(firstName=firstName, lastName=lastName,emailAddress=emailAddress, password=password, imageurl=imageurl)
        user.save()
        return HttpResponse('User added successfully')
#---------------------Validate User---------------------
@csrf_exempt
def validateUser(request):
    data = request.body
    data = json.loads(data)

    emailAddress = data['emailAddress']
    password = data['password']
    
    data1 = User.objects.filter(emailAddress = emailAddress)
    if data1.exists():
        if(data1[0].password==password):
           for valdata in data1:

                valdata=UserSerializers(data1[0]).data
                return HttpResponse(json.dumps(valdata),"Login successfully")
            
        else:
            return HttpResponse('Password not matched')
    else:
        return HttpResponse('Email not found')

#endregion

#region test
def getTests(request):
    Questions=[]
    tests = []
    testcases = []
    data = Test.objects.all()
    for test in data:
        qdata = TestStatement.objects.filter(testId = test.id)
        if qdata.exists():
            for qs in qdata:
                qs=TestStatementSerializers(qs).data
                if qs['testOption'] is False:
                    qs['testcases']=getTestCases(qs['id'])
                Questions.append(qs)
        test=TestSerializers(test).data
        test["Questions"]=Questions
        
        Questions=[]
        tests.append(test)

    return HttpResponse(json.dumps(tests))
def getTestsbyCompany(request,pk):
    Questions=[]
    tests = []
    testcases = []
    data = Test.objects.filter(company=pk)
    for test in data:
        qdata = TestStatement.objects.filter(testId = test.id)
        if qdata.exists():
            for qs in qdata:
                qs=TestStatementSerializers(qs).data
                if qs['testOption'] is False:
                    qs['testcases']=getTestCases(qs['id'])
                Questions.append(qs)
        test=TestSerializers(test).data
        test["Questions"]=Questions
        
        Questions=[]
        tests.append(test)

    return HttpResponse(json.dumps(tests))

def getTestbyId(request,pk):
    Questions=[]
    data = Test.objects.filter(id = pk)
    if data.exists():
        qdata = TestStatement.objects.filter(testId = data[0])
        if qdata.exists():
            for qs in qdata:
                qs=TestStatementSerializers(qs).data
                Questions.append(qs)
        result=TestSerializers(data[0]).data
        result["Questions"]=Questions
        return HttpResponse(json.dumps(result))
    else:
        return HttpResponse('Test not found')

def getTestbyJob(request,pk):
    Tests=[]
    Questions=[]
    
    try:
        a1 = Job.objects.get(id=pk)
        data=a1.tests.all()
        for test in data:
            qdata = TestStatement.objects.filter(testId = test)
            if qdata.exists():
                for qs in qdata:
                    qs=TestStatementSerializers(qs).data
                    if qs['testOption'] is False:
                        qs['testcases']=getTestCases(qs['id'])
                    Questions.append(qs)
            test=TestSerializers(test).data
            test["Questions"]=Questions
            Questions=[]
            Tests.append(test)
        return HttpResponse(json.dumps(Tests))
    except ObjectDoesNotExist:
        return HttpResponse("Tests not found")


def getTestCases(Id):
    testCases=[]
    data = TestCase.objects.filter(testStatement=Id)
    for case in data:
        case=TestCaseSerializers(case).data
        testCases.append(case)

    return testCases

def addTestCase(data,statement):
    testCase = TestCase.objects.create(testStatement=statement,input=data['input'],output= data['output'],hidden=data['hidden'])
    testCase.save()
    return testCase.id

def updateTestCase(data,statement):
    testCase = TestCase.objects.filter(id=data['id']).update(testStatement=statement,input=data['input'],output= data['output'],hidden=data['hidden'])
    

@csrf_exempt
def addTest(request):
    data = request.body
    data = json.loads(data)
    TestName=data['TestName']
    TotalTime= data['TotalTime']
    Deadline=data ['Deadline']
    TestDescription=data ['TestDescription']
    Questions=data['Questions']
    company=data['company']
    company=Company.objects.get(id=company)
    test = Test.objects.create(test_Name=TestName,total_Time_for_Test_in_Minutes= TotalTime,deadline= Deadline,description= TestDescription, company=company)
    test.save()
    TestId = Test.objects.latest('id')
    for q in Questions:
        question = TestStatement.objects.create(testId=TestId,statement= q['statement'],testOption= q['testOption'],option1= q['option1'],option2= q['option2'],option3= q['option3'],option4= q['option4'],correct_answer= q['answer'])
        question.save()
        if q['testOption']==False:
            for tc in q['testCases']:
                addTestCase(tc, question)
            
    
    return HttpResponse('Test added successfully')
@csrf_exempt
def updateTest(request):
    data = request.body
    data = json.loads(data)
    Id=data['id']
    TestName=data['TestName']
    TotalTime= data['TotalTime']
    Deadline=data ['Deadline']
    TestDescription=data ['TestDescription']
    Questions=data['Questions']
    test = Test.objects.filter(id=Id).update(test_Name=TestName,total_Time_for_Test_in_Minutes= TotalTime,deadline= Deadline,description= TestDescription)
    
    # quests=TestStatement.objects.filter(testId=test)
    test=Test.objects.get(id=Id)
    for q in Questions:
        if q['id']==0:
            question = TestStatement.objects.create(testId=test,statement= q['statement'],testOption= q['testOption'],option1= q['option1'],option2= q['option2'],option3= q['option3'],option4= q['option4'],correct_answer= q['answer'])
            question.save()
            if q['testOption']==False:
                for tc in q['testCases']:
                    addTestCase(tc, question)
        else:
            TestStatement.objects.filter(id=q['id']).update(testId=test,statement= q['statement'],testOption= q['testOption'],option1= q['option1'],option2= q['option2'],option3= q['option3'],option4= q['option4'],correct_answer= q['answer'])
            question=TestStatement.objects.get(id=q['id'])
            if q['testOption']==False:
                for tc in q['testCases']:
                    if tc['id']==0:
                        tid=addTestCase(tc, question)
                        tc['id']=tid
                    else:
                        updateTestCase(tc, question)
    i=0                
    for q in Questions:
        Questions[i]=TestStatement.objects.get(id=q['id'])
        if q['testOption']==False:
            testc=[]  
    #         s=0
            for tc in q['testCases']:
                if(tc['id']!=0):
                    testc.append(TestCase.objects.get(id=tc['id']))
            
            for tcs in Questions[i].testCases.all():
                
                if tcs not in testc:
                    TestCase.objects.get(id=tcs.id).delete()
                    # Questions[i].testCases.remove(tcs)
        i=i+1
    for qu in test.statements.all():
        if qu not in Questions:
            TestStatement.objects.get(id=qu.id).delete()
        
    
    # data = request.body
    # data = json.loads(data)
    # TestName=data['TestName']
    # TotalTime= data['TotalTime']
    # Deadline=data ['Deadline']
    # TestDescription=data ['TestDescription']
    # Questions=data['Questions']
    # Id=data['id']
    # print(data)
    # # test=Test.objects.get(Id=Id).update(test_Name=TestName,total_Time_for_Test_in_Minutes= TotalTime,deadline= Deadline,description= TestDescription)
    # test.save()
    
    # questions=TestStatement.objects.filter(testId=Id)
    # qIds=[]
    # for q in questions:
    #     qIds.append(q.id)
    # print(qIds)
    
    # for q in Questions:
    #     if q['id'] not in qIds:
    #         question = TestStatement.objects.create(testId=Id,statement= q['statement'],testOption= q['testOption'],option1= q['option1'],option2= q['option2'],option3= q['option3'],option4= q['option4'],correct_answer= q['answer'])
    #     else:
    #         question = TestStatement.objects.filter(id=q['id']).update(statement= q['statement'],testOption= q['testOption'],option1= q['option1'],option2= q['option2'],option3= q['option3'],option4= q['option4'],correct_answer= q['answer'])
    #     question.save()  
         
    # print(Questions['id'])
    # for qid in qIds:
    #     if qid not in Questions['id']:
    #         ques=TestStatement.objects.get(id=qid)
            # ques.delete()
    return HttpResponse('Test added successfully')

@csrf_exempt
def addTestAns(request):
    # data = request.body
    # data = json.loads(data)
    # Answer=data['answer']
    # Testid= data['Tid']
    # Qid=data ['Qid']
    # test = Test.objects.get(id = Testid)
    # testStatement = TestStatement.objects.get(id = Qid)
    # question = TestAns.objects.create(TestId=test,QId= testStatement,Answer=Answer)
    # question.save()
    pass
    return HttpResponse('Test Completed')


def statusUpdate(user,job):
    testResults=TestResult.objects.filter(Job=job,User= user)
    if testResults.count()==0:
        AppliedJobs.objects.filter(Job=job,User= user).update( Status='Started')
    elif job.tests.count()>testResults.count():
        AppliedJobs.objects.filter(Job=job,User= user).update( Status='InProgress')
        overallResult(user,job)
    else:
        AppliedJobs.objects.filter(Job=job,User= user).update( Status='Completed')
        overallResult(user,job)
 

def overallResult(user,job):
    testResults=TestResult.objects.filter(Job=job,User= user)
    result=0.0
    totalresult=0.0
    print(testResults)
    for r in testResults:
        result=result+r.result
        totalResults=TestStatement.objects.filter(testId = r.Test)
        totalresult=totalresult+totalResults.count()
    result=result/totalresult * 100
    AppliedJobs.objects.filter(Job=job,User= user).update( ResultPercentage=result)  

@csrf_exempt
def addTestResults(request):
    data = request.body
    data = json.loads(data)
    JobId=data['JobId']
    job_=data['Job']
    TestId= data['TestId']
    user=data['id']
    result=data['result']
    timeStarted= data['time_started']
    timeEnded=data['time_ended']
    user = User.objects.get(Id = user)
    test = Test.objects.get(id = TestId)
    job = Job.objects.get(id = JobId)
    job_=AppliedJobs.objects.get(Job=job,User=user)
    test_result = TestResult.objects.create(Job=job,Jobs=job_,Test=test,User= user,result=result,time_started=timeStarted,time_ended=timeEnded)
    test_result.save()
    statusUpdate(user,job)
    return HttpResponse('Test Completed')

#endregion

@csrf_exempt
def getTestResult(request):
    data = request.body
    data = json.loads(data)
    user=data['id']
    job_=data['Job']
    test= data['Test']
    print(data)
    result=[]
    test_result = TestResult.objects.filter(Job_id=job_,Test_id=test,User_id= user)
    print(test_result)
    for res in test_result:
        res = TestResultSerializers(res).data
        result.append(res)
    print(result)
    return HttpResponse(json.dumps(result)) 

#region job model
def getJobs(request):
    jobs = []
    data = Job.objects.all()
    for job in data:
        job=JobSerializers(job).data
        jobs.append(job)
    return HttpResponse(json.dumps(jobs))

def getAppliedJobs(request,pk):
    jobs = []
    data = AppliedJobs.objects.filter(User_id=pk)
    for job in data:
        job=JobSerializers(job.Job).data
        jobs.append(job)
    return HttpResponse(json.dumps(jobs))

def getJobsbyId(request,pk):
    jobs = []
    company=Company.objects.get(id=pk)
    data = Job.objects.filter(company=company)
    for job in data:
        job=JobSerializers(job).data
        jobs.append(job)
    return HttpResponse(json.dumps(jobs))

def getresultbyuserId(request,pk):
    
    Jobs=[]
    results=[]
    list=[]
    newlist = []
    
    idata=TestResult.objects.filter(User_id=pk)
    
    if idata.exists():
        for filterid in idata:
            jbdata=Job.objects.filter(id=filterid.Job.id)
            list.append(jbdata[0])
          
            for i in list:
                if i not in newlist:
                    newlist.append(i)

    if newlist:
        for fid in newlist:
           
            resultdata=TestResult.objects.filter( Job_id=fid , User_id=pk )
         
           
           
            if resultdata.exists():
                for jobtest in resultdata:
                    
                    jobtest=TestResultSerializers(jobtest).data
                    results.append(jobtest)
            
            answer=JobSerializers(fid).data
            answer["results"]=results
            results=[]
            Jobs.append(answer)
        return HttpResponse(json.dumps(Jobs))


def getJobsbyuserId(request,pk):
    results = []
    Jobs=[]
    tests=[]
    list=[]
    newlist = []
    idata=JobApply.objects.filter(User_id=pk)
    
    if idata.exists():
        for filterid in idata:
            jbdata=Job.objects.filter(id=filterid.Job.id)
            list.append(jbdata[0])
           
          
            for i in list:
                if i not in newlist:
                    newlist.append(i)

    if newlist:
        for fid in newlist:
            data=fid.tests.all()
            
            if data.exists():
                for jobtest in data:
                    resultdata=TestResult.objects.filter(Test_id=jobtest,Job_id=fid,User_id=pk)
                    if resultdata.exists():
                        for rdata in resultdata:
                            rdata=TestResultSerializers(rdata).data
                            results.append(rdata)

                    jobtest=TestSerializers(jobtest).data
                    jobtest["results"]=results
                    results=[]
                    tests.append(jobtest)
            
            answer=JobSerializers(fid).data
            answer["tests"]=tests
            tests=[]
            Jobs.append(answer)
        return HttpResponse(json.dumps(Jobs))

 



@csrf_exempt
def addJob(request):
    
    data = request.body
    data = json.loads(data)
    title=data['title']
    description= data['desc']
    working_hours=int(data['hours'])
    salary=data ['salary']
    salarytype =data['salarytype']
    currency=data ['currency']
    jobtype=data ['jobtype']
    tests=data ['test']
    company=data ['company']
    company=Company.objects.get(id=company)
    
    job = Job.objects.create(title=title,description= description,working_hours= working_hours,salary=salary,salarytype= salarytype,currency= currency,jobtype= jobtype,company=company)
    
    job.save()
    for t in tests:
        test = Test.objects.get(id = t['id'])
        
        job.tests.add(test)
    return HttpResponse('Job added')

@csrf_exempt
def editJob(request):
    data = request.body
    data = json.loads(data)
    Id=data['id']
    title=data['title']
    description= data['desc']
    working_hours=int(data['hours'])
    salary=data ['salary']
    salarytype =data['salarytype']
    currency=data ['currency']
    jobtype=data ['jobtype']
    tests=data ['test']
    print(Id)
    Job.objects.filter(id=Id).update(title=title,description= description,working_hours= working_hours,salary=salary,salarytype= salarytype,currency= currency,jobtype= jobtype)
   
    job=Job.objects.get(id=Id)
    i=0
    for t in tests:
        tests[i]=Test.objects.get(id=t['id'])
        i=i+1
    for t in tests:
        if t not in job.tests.all():
            job.tests.add(t)
     
    for test in job.tests.all():
        if test not in tests:
            job.tests.remove(test)
         
    return HttpResponse('Job Edited Successfully')

#endregion

@csrf_exempt
def deleteTest(request,pk):
    Test.objects.filter(id=pk).delete()
    return HttpResponse("Test Deleted")
@csrf_exempt
def deleteJob(request,pk):
    Job.objects.filter(id=pk).delete()
    return HttpResponse("Job Deleted")
@csrf_exempt
def addJobApply(request):
    data = request.body
    data = json.loads(data)
    JobId=data['JobId']
    TestId=data['TestId']
    UId=data['UserId']
    UserId=UId['Id']
    user = User.objects.get(Id = UserId)
    test = Test.objects.get(id = TestId)
    job = Job.objects.get(id = JobId)
    job_apply= JobApply.objects.create(Job=job,Test=test,User= user)
    job_apply.save()
    return HttpResponse('Job Applied')


@csrf_exempt
def addJobApply(request):
    data = request.body
    data = json.loads(data)
    JobId=data['JobId']
    TestId=data['TestId']
    UId=data['UserId']
    UserId=UId['Id']
    user = User.objects.get(Id = UserId)
    test = Test.objects.get(id = TestId)
    job = Job.objects.get(id = JobId)
    job_apply= JobApply.objects.create(Job=job,Test=test,User= user)
    job_apply.save()
    return HttpResponse()

@csrf_exempt
def addJobAppliedbyUser(request):
    data = request.body
    data = json.loads(data)
    job=data['Job']
    user=data['id']
    
    user = User.objects.get(Id = user)
    job = Job.objects.get(id = job)
    job_apply= AppliedJobs.objects.create(Job=job,User= user, Status='Started',ResultPercentage=0)
    job_apply.save()
    return HttpResponse('Job Applied')

@csrf_exempt
def jobApplyCheck(request):
    data = request.body
    data = json.loads(data)
    job=data['Job']
    user=data['id']
    
    user = User.objects.get(Id = user)
    job = Job.objects.get(id = job)
    
    data= AppliedJobs.objects.filter(Job=job,User= user)
    if data.exists():
        
        return HttpResponse('True')
    else:
        return HttpResponse('False') 
  
@csrf_exempt
def testAttemptCheck(request):
    data = request.body
    data = json.loads(data)
    job=data['Job']
    user=data['id']
    test=data['test']
    
    user = User.objects.get(Id = user)
    job = Job.objects.get(id = job)
    test = Test.objects.get(id = test)
    
    data= TestResult.objects.filter(Job=job,User= user,Test=test)
    if data.exists():
        return HttpResponse('True')
    else:
        return HttpResponse('False') 
    

@csrf_exempt
def JobStatusUpdate(request):
    pass
    # data = request.body
    # data = json.loads(data)
    # Job=data['Job']
    # User=data['id']
    # user = User.objects.get(Id = User)
    # job = Job.objects.get(id = JobId)
    # job_apply= AppliedJobs.objects.filter(Job=job,User= user).update(s)
    # return HttpResponse('Job Applied')

def getJobPostedByCompany(request,pk): #getting id of comapny and request from the frontend
    jobs= [] #storing all jobs posted by the comapny
    a1 = User.objects.get(id=pk)
    userx = User.objects.get(id=pk)
    jobdata = userx.jobdata.all()                               #matching the frontends id is equal to the backend id

    for user in jobdata:
        jobdata = Job.objects.filter(id=pk)
        if(jobdata.id==pk):
            user=UserSerializers(user).data
        jobs.append(user)
    return HttpResponse(json.dumps(jobs))
def getJobByUserID(request,pk):
    allJobs=[]
    data=User.objects.filter(Id=pk)
    if data.exists():
        jdata = Job.objects.filter(user_id= data[0])
        for js in jdata:
            js= JobSerializers(js).data
            allJobs.append(js)
    result=UserSerializers(data[0]).data
    result["alljobs"]=allJobs
    ###########################################status #############
  
    return HttpResponse(json.dumps(result))

def countStatus(request,pk):
     #Status = 'Completed'
    Started = []
    InProgress = []
    Completed = []
    jobs = []
    result={
    #    "allJobs":[],
        "Started" :  [],
        "InProgress" : [],
        "Completed" : [],
        "jobs" :[]
        }
  #
    job = Job.objects.filter(id = pk)


    data = Total_Applications.objects.filter(title = pk)
    for jb in data:
        jb = Total_ApplicationsSerializers(jb).data
        if jb["Status"] == "Completed":
           Completed.append(jb)
      #  print("Tests having status completed ---", Completed)
    for jb in data:
        jb = Total_ApplicationsSerializers(jb).data
        if jb["Status"] == "InProgress":
           InProgress.append(jb)
      #  print("Tests having status completed ---", InProgress)

    for jb in data:
        jb = Total_ApplicationsSerializers(jb).data
        if jb["Status"] == "Started":
           Started.append(jb)

    for jb in job:
        jb = JobSerializers(jb).data
       # print("jb",jb)
        jobs.append(jb)

   # print("jobsss?????????-----------------------------?",jobs)
    result['Started'] = Started
    result['InProgress'] = InProgress
    result['Completed'] = Completed
    result['jobs'] = jobs

    return HttpResponse(json.dumps(result))


def getStatusbyJob(request,pk):
    allStatus=[]
    data=Job.objects.filter(id=pk)

    if data.exists():
        sdata = Total_Applications.objects.filter(title=data[0])
        for sd in sdata:
            sd = Total_ApplicationsSerializers(sd).data
            allStatus.append(sd)
    result= JobSerializers(data[0]).data
    result["allStatus"]=allStatus
    return HttpResponse(json.dumps(result))
@csrf_exempt
def addApplicationStatus(request):
    data=request.body

    data = json.loads(data)
    Status= data['Status']
    user = data['user']
    title = data['title']
    test = data['test']

    applicationStatus = Total_Applications.objects.create(Status=Status,user=user,title=title,test=test)
    applicationStatus.save()
    return HttpResponse('ApplicationStatus updated')
def getallPostedJobs(request):
    applications = []

    data = Total_Applications.objects.all()
    for application in data:
        application=Total_ApplicationsSerializers(application).data
        applications.append(application)
    return HttpResponse(json.dumps(applications))


##############################################Company##############################################################

@csrf_exempt
def addCompany(request):
    data = request.body
    data = json.loads(data)
    name = data['name']
    emailAddress = data['emailAddress']
    password = data['password']
    location = data['location']
    description = data['description']
    website = data['website']
    logo = data['logo']
    if Company.objects.filter(emailAddress = emailAddress).exists():
        return HttpResponse('Company already exists')
    else:
        company = Company.objects.create(name=name, emailAddress=emailAddress,description=description, location=location, logoUrl=logo, website=website, password=password)
        company.save()
        return HttpResponse('Company added successfully')
    
@csrf_exempt
def validateCompany(request):
    data = request.body
    data = json.loads(data)

    emailAddress = data['emailAddress']
    password = data['password']
    
    data1 = Company.objects.filter(emailAddress = emailAddress)
    if data1.exists():
        if(data1[0].password==password):
           for valdata in data1:
                valdata=CompanySerializers(data1[0]).data
                return HttpResponse(json.dumps(valdata),"Login successfully")
            
        else:
            return HttpResponse('Password not matched')
    else:
        return HttpResponse('Email not found')
