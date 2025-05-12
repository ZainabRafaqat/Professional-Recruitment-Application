import React, { useEffect, useState } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import axios  from 'axios';
import TestResult from '../Test/AttemptTest/TestResult';
const UserProfile = () => {
    let id=localStorage.getItem("userId")
    const[jobs,setJobs]=useState()
    const[Finalresult,setFinalResult]=useState()
    const[finalTest,setFinalTest]=useState()
    const[Testresult,setTestResult]=useState([])
  
    const[user,setUser]=useState([])
   
    useEffect(()=>{
       
    
     
        axios
        .get('http://127.0.0.1:8000/getUserbyId/'+  id )
        .then((response) => {
            setUser(response.data)
            console.log(response.data)
          // navigate(-1)
        })
        .catch((error) => {
          // setError(error);
          console.log(error)
        });
        
        axios.get("http://127.0.0.1:8000/getJobsbyuserId/"+ id)
        .then((response) => 
          {
            
            setJobs(response.data)
           }
          )
        
        axios
        .get('http://127.0.0.1:8000/getresultbyuserId/'+  id )
        .then((response) => {
            setTestResult(response.data)
           
          // navigate(-1)
        })
        .catch((error) => {
          // setError(error);
          console.log(error)
        });
        
     
  
    },[id])
    console.log(Testresult)
    console.log(jobs)
  useEffect(()=>{Testresult.map((val)=>{
    let {results}=val
    setFinalResult(results)
}
  )},[Testresult])

  useEffect(()=>{jobs?.map((val)=>{
    let {tests}=val
    setFinalTest(tests)
    console.log(tests)
}
  )},[jobs])
   
  {jobs?.map((val)=>{
  
    console.log(val.tests)
  
    {
      val.tests.map((val1)=>{
        console.table(val1)

        {
          val1.results.map((val2)=>{
            console.log(val2.result)
          })
        }
      })
    }
}
  )}


  console.log(finalTest)

  Testresult
  .filter((val, index) => val.results.User == id)
  .map(
    (val) => (
     console.log(val)
    )
  );
    
    console.log(Finalresult)
  
    
    
  return (
    <div >
    <section className="vh-100" style={{ backgroundColor: 'white', overflow: 'scroll' }}>
      <MDBContainer className="py-5 h-100" style={{ height: '100vh' }}>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
          
              <MDBRow className="g-0">
               
{/* <<<<<<< HEAD */}
              { user.map((val)=>(<MDBCol md="4" className="gradient-custom text-center text-white" style={{ backgroundColor: ' #152b3c',borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
{/* =======
              { user.map((val)=>(<MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
>>>>>>> master */}
                  <MDBCardImage src={val.imageurl}
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                 <MDBTypography tag="h5">{val.firstName + val.lastName }</MDBTypography>
                 
                  <MDBCardText>Applicant</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>))}
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">User Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
             {    user.map((val)=>( <MDBCardBody className="p-4"><MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{val.emailAddress}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Password</MDBTypography>
                        <MDBCardText className="text-muted">{val.password}</MDBCardText>
                      </MDBCol>
                    </MDBRow></MDBCardBody>)) }

                    <MDBTypography tag="h6">Jobs Applied</MDBTypography>
                    <hr className="mt-0 mb-4" />
                  
                   { jobs ? jobs?.map((val)=>(
                      <MDBCardBody className="p-4">
                   <MDBRow className="pt-1">
                      <MDBCol size="10" className="mb-3" key={val.id}>
                        <MDBTypography tag="h6">Title</MDBTypography>
                        <MDBCardText className="text-muted" >{val.title}</MDBCardText>
                      </MDBCol>
                      {/* <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Description</MDBTypography>
                        <MDBCardText className="text-muted">{val.description}</MDBCardText>
                      </MDBCol> */}
                    </MDBRow><MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Company Name</MDBTypography>
                        <MDBCardText className="text-muted">{val.company_name}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Job Type</MDBTypography>
                        <MDBCardText className="text-muted">{val.jobtype}</MDBCardText>
                      </MDBCol>
                    <MDBTypography tag="h6">Attempted Tests</MDBTypography>
                    <hr className="mt-0 mb-4" />
                      
                    {
                    val.tests.map((val1)=>(
                  
                  
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Test Title</MDBTypography>
                        <MDBCardText className="text-muted">{val1.test_Name}</MDBCardText>

                        {
                        val1.results.map((val2)=>(
                          <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Marks Obtained</MDBTypography>
                          <MDBCardText className="text-muted">{val2.result}</MDBCardText>
                          </MDBCol> 
                       
                         ))}



                      </MDBCol> 
                      
                      
                      ))}
                    </MDBRow></MDBCardBody>
                    )): <MDBCardText className="text-muted">User hasn't applied to any jobs yet.</MDBCardText>}
                  
                  </MDBCardBody>
                </MDBCol>
                
               
                  
            
              </MDBRow>
          
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </div>
    
   
  )
}

export default UserProfile

