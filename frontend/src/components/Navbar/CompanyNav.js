import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    } from './NavbarElements';

import { Link } from 'react-router-dom';
import {CgProfile } from 'react-icons/cg';
function CompanyNav(props) {
  return (
    <div> <Nav>
   <Bars />
   <Link className='title link' to="/"><h4>Recruiter.com</h4></Link>

    <NavMenu>

    <NavLink to='/companyprofile' >
    < CgProfile/>
    </NavLink>
     <NavLink to='/joblist'>
        Job List
    </NavLink> 
    
     <NavLink to='/tests'>
        Test List
    </NavLink> 
		{/* <NavLink to= 'JobsbyCompany/'>
			Posted jobs
		</NavLink> */}
    </NavMenu>
    <NavBtn>
    <NavBtnLink to='/' onClick={props.onLogout}> Logout</NavBtnLink>
    </NavBtn>
    
</Nav></div>
  )
}

export default CompanyNav