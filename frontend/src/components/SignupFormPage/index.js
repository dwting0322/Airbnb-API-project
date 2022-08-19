// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
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
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({  firstName, lastName, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
        <h2>Please Singup</h2>
        <form onSubmit={handleSubmit}>
        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div>
        <label>
            Firstname
            <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            required
            />
        </label>
        </div>
        <div>
        <label>
            Lastname
            <input
            type="text"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            required
            />
        </label>
        </div>
        <div>
        <label>
            Email
            <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        </div>
        <div>
        <label>
            Username
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </label>
        </div>
        <div>
        <label>
            Password
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        </div>
        <div>
        <label>
            Confirm Password
            <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </label>
        </div>
        <button type="submit">Sign Up</button>
        </form>
    </>
  );
}

export default SignupFormPage;