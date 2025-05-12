import React from 'react';
import { useNavigate } from "react-router-dom";
import CandidateNav from './CandidateNav';
import CompanyNav from './CompanyNav';
import { Link } from 'react-router-dom';
import {
	Nav,
	Bars,
	NavBtn,
	NavBtnLink,
} from './NavbarElements';
import '../form.css';
function Navbar(props) {
	const navigate = useNavigate();
	let userType = localStorage.getItem("isUser");

	const onLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("userId");
		localStorage.removeItem("isUser");

	};

	if (userType == 'Company') {
		return (
			<>
				<CompanyNav onLogout={onLogout}></CompanyNav>
			</>
		);

	}
	else if (userType == 'Candidate') {
		return (
			<>
				<CandidateNav onLogout={onLogout}></CandidateNav>
			</>
		);

	}
	else {
		return (<Nav>
			<Bars />
			<Link className='title link' to="/"><h4>Recruiter.com</h4></Link>
			<NavBtn>
				<NavBtnLink to='/sign-in' >Sign In as Candidate</NavBtnLink>
			</NavBtn>
			<NavBtn>
				<NavBtnLink to='/companySignIn' >Sign In as Recruiter</NavBtnLink>
			</NavBtn>

		</Nav>)
	}

};

export default Navbar;
