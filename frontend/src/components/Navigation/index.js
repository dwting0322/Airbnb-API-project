// frontend/src/components/Navigation/index.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import DemoUser from '../DemoUser/demo-user';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  
  const openMenu = () => {
  
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        {/* <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
        <DemoUser /> */}
         <div className="profile_button" onClick={openMenu}>
          <i class="fa-solid fa-list"></i> <i className="fas fa-user-circle" />
         </div>
         
      </>
    );
  }

  return (
    <div>
      <ul className='Nav_container'>
        <div className='Airbnb_logo'>
          <li >
            <NavLink to={'/'}><i class="fa-brands fa-airbnb">WonderlandBnB</i></NavLink>
          </li>
        </div>

        <div className='Nav_become__host_and_Home_link'>
          <li><Link to={'/spots'} className='Nav_become__host_link'>Become Host? </Link></li>
          <li>
            <button className='Nav_Home_button'>
              {/* <NavLink exact to="/">Home</NavLink> */}
              {isLoaded && sessionLinks}
            </button>
          </li>
        </div>
        
      </ul>
    </div>
  );
}

export default Navigation;