// frontend/src/components/SignupFormPage/index.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';


function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!email.includes("@"))
    // return setErrors(['The email must have @, please enter a valid email'])

    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({firstName, lastName, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          // if (data && data.errors) setErrors(data.errors);
          const err = Object.values(data.errors)
          if(err) setErrors(err);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div>
        <h2 className="Sign_up_words">Please Sign up</h2>
        <form className="Sign_up_container" onSubmit={handleSubmit}>
        <ul className="Sign_up_errorlist">
            {errors.map((error, idx) => <li key={idx}><i className="fa-solid fa-ban"></i> {error}</li>)}
        </ul>
        <div className="Firstname">
        <label >
            Firstname:
            <input className="Firstname_Input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            required
            />
        </label>
        </div>
        <div className="Lastname">
        <label>
            Lastname:
            <input className="Lastname_input"
            type="text"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            required
            />
        </label>
        </div>
        <div className="Email">
        <label>
            Email:
            <input className="Email_input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        </div>
        <div className="Username">
        <label>
            Username:
            <input className="Username_input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </label>
        </div>
        <div>
        <label>
            Password:
            <input className="Signup_Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        </div>
        <div className="Confirm_Password">
        <label>
            Confirm Password:
            <input className="Confirm_Password_input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </label>
        </div>
        <button className="Sign_up_Button" type="submit">Sign Up</button>
        </form>
    </div>
  );
}

export default SignupFormPage;