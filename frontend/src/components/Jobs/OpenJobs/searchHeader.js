import React from 'react'
import "./searchHeader.css"
import {HiSearch } from 'react-icons/hi';
import {IconContext} from "react-icons";
import image from '../../images/imageMan.png'
import { Helmet } from "react-helmet";
//import useMediaQuery from '@mui/material/useMediaQuery';
function SearchHeader() {
  return (
    
         <div className="nav-section" >
           <Helmet>
                <meta charSet="utf-8" />
                <title>check</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>
        {/* <div className="nav-bar"><h3 className="logo">Recruiter.com</h3>
        <img className="img"  src="https://www.w3schools.com/howto/img_avatar2.png" alt=''></img> */}
        {/* </div> */}
      
        <div className="header">
            <div className="col">
                <h1 className='heading'>Find Your Dream Job</h1>
                <div className="search-bar">
                <IconContext.Provider value={{ className:"myReact-icons"}} >
                <HiSearch />
                </IconContext.Provider>
                <input className="search-input" type="search" placeholder="Job title or keyword"></input>
                <button className="search-btn">Search</button>
                </div>
            </div>
           
            <img width="25%" height="25%" className="img-style" alt='designimg'     src={image}></img>
        </div>

    </div>

    
  )
}

export default SearchHeader
