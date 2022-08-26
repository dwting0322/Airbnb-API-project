// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css';
import { login } from "../../store/session";



function ProfileButton({ user, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/signup")

  };



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
        <i className="fa-solid fa-list"></i> <i className="fas fa-user-circle" />
      </div>
      {user ? showMenu && (

        <ul className="profile-dropdown">

          <li className="username"><i className="fa-solid fa-user-check"></i> {user.username}</li>
          <li className="email"><i className="fa-solid fa-at"></i> {user.email}</li>

          <li>
            <NavLink to={'/spots/current'} className="Nav_Link"><i className="fa-solid fa-house"></i> Host your home</NavLink>
          </li>

          <li>
            <NavLink to={'/reviews/current'} className="Nav_Link"><i className="fa-solid fa-pen"></i> Host your experience</NavLink>
          </li>

          <li>
            <button className="Logout_button" onClick={logout}><i className="fa-solid fa-plug-circle-xmark"></i>Log Out</button>
          </li>
        </ul>

      )
        : showMenu && (
          <ul>
            <div>
              <li className="list"><i className="fa-solid fa-user"></i><button className="button" onClick={() => setShowModal(true)}>Log In</button></li>
              {/* <li><NavLink to="/signup">Sign Up</NavLink></li> */}
              <li className="list"><i className="fa-solid fa-user-plus"></i><button className="button" onClick={handleSubmit}>Sign Up</button></li>
              <li className="list"><i className="fa-solid fa-user-astronaut"></i><button className="button" onClick={() => dispatch(login({ credential: "Demo-lition", password: "password", }))}>Demo User</button></li>
            </div>
          </ul>
        )
      }
    </>
  );
}

export default ProfileButton;