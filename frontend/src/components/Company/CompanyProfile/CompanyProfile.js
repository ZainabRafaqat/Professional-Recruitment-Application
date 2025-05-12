import React, { useEffect, useState } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBCardLink, MDBCardSubTitle, MDBCardTitle } from 'mdb-react-ui-kit';
import axios from 'axios';
const CompanyProfile = () => {
  let id = localStorage.getItem("userId")
  const [user, setUser] = useState([])

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/getCompanybyId/' + id)
      .then((response) => {
        setUser(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }, [id])


  return (
    <div >
      <section className='vh-100' style={{ backgroundColor: 'white', overflow: "scroll" }}>
        <MDBContainer style={{ width: '100vw' }}>


          <MDBRow md="8">

            {user.map((val) => (<MDBCol md="3" className="gradient-custom text-center text-white" style={{ backgroundColor: '#152b3c', borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>

              <MDBCardImage src={val.logoUrl}
                alt="Avatar" className="my-5" fluid  style={{ width: '50%' }}/>
              <MDBTypography tag="h2">{val.name}</MDBTypography>
            </MDBCol>))}
            <MDBCol md="9 p-3">
              <MDBCardBody className="p-1">
                <MDBTypography tag="h6">Company Information</MDBTypography>
                <hr className="mt-0 mb-4" />
                {user.map((val) => (<MDBCardBody className="p-1"><MDBRow className="pt-1">

                  <MDBCol size="10" className="mb-1">
                    <MDBCardTitle >Name</MDBCardTitle>
                    <MDBCardText >{val.name}</MDBCardText>
                  </MDBCol>
                  <MDBCol size="10" className="mb-1">
                    <MDBCardTitle >Recruiter's Email</MDBCardTitle>
                    <MDBCardText >{val.emailAddress}</MDBCardText>
                  </MDBCol>
                  <MDBCol size="8" className="mb-1">
                    <MDBCardTitle >HQ Location</MDBCardTitle>
                    <MDBCardText >{val.location}</MDBCardText>
                  </MDBCol>
                  <MDBCol size="8" className="mb-1">
                    < MDBCardTitle>Website</MDBCardTitle>
                    <MDBCardLink href={val.website} target="_blank">{val.website}</MDBCardLink>
                  </MDBCol>
                  <MDBCol size="9" className="mb-2">
                    <MDBCardTitle >Description</MDBCardTitle>
                    <MDBCardText >{val.description}</MDBCardText>
                  </MDBCol>
                </MDBRow></MDBCardBody>))}

              </MDBCardBody>
            </MDBCol>

          </MDBRow>

        </MDBContainer>
      </section>
    </div>


  )
}

export default CompanyProfile

