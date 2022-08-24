// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import DemoUser from '../DemoUser/demo-user';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

 

  return (
    <>

      <div className="profile-button" onClick={openMenu}>
        <i class="fa-solid fa-list"></i> <i className="fas fa-user-circle" />
      </div>
      { showMenu && (

        <ul className="profile-dropdown">

          <li>{user.username}</li>
          <li>{user.email}</li>

          <li>
            <NavLink to={'/spots/current'} className="Nav_Link">Host your home</NavLink>
          </li>

          <li>
            <NavLink to={'/reviews/current'} className="Nav_Link">Host your experience</NavLink>
          </li>

          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      ) 
      // :  (
      //   <ul>
      //     <div>
      //       <li><LoginFormModal /></li>
      //       {/* <li><NavLink to="/signup">Sign Up</NavLink></li> */}
      //       <li><button onClick={handleSubmit} type="submit">Sign Up</button></li>
      //       <li><DemoUser /></li>
      //     </div>
      //   </ul>
     
      // )
      }
    </>
  );
}

export default ProfileButton;