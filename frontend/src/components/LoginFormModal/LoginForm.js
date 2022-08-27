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
        // console.log("data.errors", data)
        if (data && data.errors) {

          const err = Object.values(data.errors)
          // console.log("err", err)
          if (err) setErrors(err);
          // if (!user)  alert("Please enter a valid Username/Email or Password")
        }
      }
    );
  };



  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="Login_Airbnb_logo">
        <i className="fa-brands fa-airbnb">WonderlandBnB</i>
      </div>

      <div className="login_error_container">
        <ul>
          {errors.map((error, idx) => (
            <li className="login_errorlist" key={idx}>{error.message}</li>
          ))}
        </ul>
      </div>

      <div className="Login_Container">
        <div className="Username_Email">
          <label>
            Username or Email:
            <input className="input_1"
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
            <input className="input_1"
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