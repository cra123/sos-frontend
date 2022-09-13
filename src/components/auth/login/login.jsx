import "./login.css";
import React, { useState } from "react";
import { login } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../utils/paths";
import * as USER_HELPERS from "../../../utils/userToken";

function Login({ authenticate }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = { email, password };

    login(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
    });
  }
  return (
    <div className="loginParent">
      <div className="login">
        <div className="container">
          <form className="loginform" onSubmit={handleFormSubmission}>
            <div className="form-group">
              <label htmlFor="inputEmail" id="label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="inputPassword" id="label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
              ></input>
            </div>
            {error && (
              <div className="error-block">
                <p>There was an error submiting the form:</p>
                <p>{error.message}</p>
              </div>
            )}
            <button type="submit" className="btn btn-primary font-weight-bold">
              Login
            </button>
            <p>
              Don't have an account ?
              <span className="text-light">
                <em>
                  <a href="{}"> Sign Up </a>
                </em>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
