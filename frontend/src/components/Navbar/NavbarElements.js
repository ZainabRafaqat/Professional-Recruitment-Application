import { FaBars, FaFileExcel } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
background: black;
height: 85px;
display: flex;
justify-content: right;
flex-direction:flex-start;
padding: 0.2rem calc((100vw - 1000px) / 2);
position:sticky;
/* Third Nav */
/* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
color: #808080;
display: flex;

align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&.active {
	color: #ffffff;
}

&:hover {
	color: #fff;
}
`;

export const Bars = styled(FaBars)`
display: none;
color: #ffffff;
@media screen and (max-width: 768px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1.8rem;
	cursor: pointer;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -4px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
	display: none;
}
`;

export const NavBtn = 
styled.nav`
display: flex;
align-items: center;
margin-right: -15px;
/* Third Nav */
/* justify-content: flex-end;
width: 100vw; */
@media screen and (max-width: 768px) {
	display: none;
}
`;


export const NavBtnLink = styled(Link)`
border-radius: 4px;
background: #0a151d;
padding: 10px 22px;
color: #ffffff;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
/* Second Nav */
margin-left: 24px;
&:hover {
	transition: all 0.2s ease-in-out;
	background: #fff;
	color: #0a151d;
}
`;
