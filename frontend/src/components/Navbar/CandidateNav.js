import React from 'react';

import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import {CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
function CandidateNav(props) {
  return (
    <div><Nav>
    <Bars />
			<Link className='title link' to="/"><h4>Recruiter.com</h4></Link>
    <NavMenu>
    <NavLink to='/userprofile' >
    < CgProfile/>
    </NavLink>

    <NavLink to='/openjobs'>
        Open Jobs
    </NavLink> 
    <NavLink to='/appliedJobs'>
        Applied Jobs
    </NavLink> 
    </NavMenu>

    <NavBtn>

    <NavBtnLink to='/' onClick={props.onLogout}> Logout</NavBtnLink>
    </NavBtn>
</Nav></div>
  )
}

export default CandidateNav