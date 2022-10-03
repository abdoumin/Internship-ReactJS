import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavLinkImage
} from './NavbarElements';

import AuthenticationService from "../../pages/login/AuthenticationService";

const Navbar = () => {
  
  const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  let isLoggedIn = AuthenticationService.isUserLoggedIn();
  console.log(isLoggedIn);

  const logout =()=>{
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem("token");
  }
  return (
    <>
      <Nav>
        <NavLinkImage to='/' style={{ padding : 0  }}>
          <img src={require('./baridBankLogo.png')} style={{ height: 85, width : 250 , }} alt='logo' />
        </NavLinkImage>
        <Bars />
        <NavMenu>
          <NavLink to='/estivages' activeStyle>
            HOME
          </NavLink>
          <NavLink to='/reservations' activeStyle>
            Mes Demandes
          </NavLink>
          {/* <NavLink to='/contact-us' activeStyle>
            Contact Us
          </NavLink>
          <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink> */}
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          {isLoggedIn ? <NavBtnLink to='/login' onClick={logout}>Logout</NavBtnLink> : <NavBtnLink to='/login'>Login</NavBtnLink>}
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
