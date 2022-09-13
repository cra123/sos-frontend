import React, { useState } from "react";
import { signup } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../utils/paths";
import * as USER_HELPERS from "../../../utils/userToken";

import "./signup.css";

function Signup2({ authenticate }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    emergencyContact: "",
  });

  const { name, email, password, phone, address, emergencyContact } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      name,
      email,
      password,
      phone,
      address,
      emergencyContact,
    };
    console.log(credentials);
    signup(credentials).then((res) => {
      if (!res.status) {
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: "Signup was unsuccessful! Please check the console.",
        });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
    });
  }

  return (
    <div className="signinParent">
      <div className="signup">
        <div className="container">
          <form className="signupform" onSubmit={handleFormSubmission}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputName">Name</label>
                <input
                  type="name"
                  className="form-control"
                  id="inputName"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  required
                ></input>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  required
                ></input>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputPhone">Phone</label>
                <input
                  type="phone"
                  className="form-control"
                  id="inputPhone"
                  placeholder="Phone"
                  name="phone"
                  value={phone}
                  onChange={handleInputChange}
                  required
                ></input>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputEmergenctContactPhone">
                  Emergency Contact Phone
                </label>
                <input
                  type="phone"
                  className="form-control"
                  id="inputEmergenctContactPhone"
                  placeholder="Emergency Phone"
                  name="emergencyContact"
                  value={emergencyContact}
                  onChange={handleInputChange}
                  required
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Apartment, studio, or floor"
                name="address"
                value={address}
                onChange={handleInputChange}
                required
              ></input>
            </div>

            
              <div className="form-group">
                <label htmlFor="inputPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  required
                ></input>
              </div>
            
            {error && (
              <div className="error-block">
                <p>There was an error submiting the form:</p>
                <p>{error.message}</p>
              </div>
            )}
            <button type="submit" className="btn btn-primary font-weight-bold">
              Sign in
            </button>
            <p>
              Already have an account ?
              <span className="text-light">
                <em>
                  <a href="{}"> login </a>
                </em>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup2;
