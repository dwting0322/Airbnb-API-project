// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import DemoUser from '../DemoUser/demo-user';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
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

      <div className="profile_button" onClick={openMenu}>
        <i class="fa-solid fa-list"></i> <i className="fas fa-user-circle" />
      </div>
      {{user} ? showMenu && (

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
      ):
      showMenu && (
        <ul>
          <li><LoginFormModal /></li>
          <li><NavLink to="/signup">Sign Up</NavLink></li>
          <li><DemoUser /></li>
        </ul>
      )
      
      }
    </>
  );
}

export default ProfileButton;