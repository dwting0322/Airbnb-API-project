// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.css"


function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const user = useSelector(state => state.session.user);



  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          if (!user) return alert("Please enter a valid Username/Email or Password")
          setErrors(data.errors);
        }
      }
    );
  };



  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="Login_Airbnb_logo">
        <i className="fa-brands fa-airbnb">WonderlandBnB</i>
      </div>

      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className="Login_Container">
        <div className="Username_Email">
          <label>
            Username or Email:
            <input className="input"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="Password">
          <label>
            Password:
            <input className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="login_login" type="submit">Continue </button>
        <i className="fa-solid fa-rocket"></i>
      </div>
    </form>
  );
}

export default LoginForm;