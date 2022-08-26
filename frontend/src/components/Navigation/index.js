// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';



function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/signup")
    
  };


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
      {/* <div>
         <div>
       <button className="profile-button" onClick={openMenu}>
        <i class="fa-solid fa-list"></i> <i className="fas fa-user-circle" />
      </button>
        </div>
      </div> */}

      {/* <ul>
        <li><LoginFormModal /></li>
        <li><button onClick={handleSubmit} type="submit">Sign Up</button></li>
     
      </ul>   */}
        <ProfileButton user={sessionUser} setShowModal={setShowModal} showModal={showModal}/>
        <LoginFormModal setShowModal={setShowModal} showModal={showModal}/>
      </>
    );
  }

  return (
    <div className='Parent_navbar'>
      <ul className='Navbar_container'>
        <div className='Airbnb_logo'>
          <li >
            <NavLink className='home_link' to={'/'}><i className="fa-brands fa-fort-awesome"></i> WonderlandBnB</NavLink>
          </li>
        </div>

        <div className='Nav_become__host_and_Home_link'>
          <li><Link to={'/spots'} className='Nav_become__host_link'> Become Host? </Link></li>
          <li>
            <div className='Nav_Home_button'>
              {/* <NavLink exact to="/">Home</NavLink> */}
              {isLoaded && sessionLinks}
            </div>
          </li>
        </div>
        
      </ul>
    </div>
  );
}

export default Navigation;