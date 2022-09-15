import "./createEmergency.css";
import React, { useState } from "react";
import { createUser } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../utils/paths";
import * as USER_HELPERS from "../../../utils/userToken";

function CreateEmargency() {
  const [form, setForm] = useState({
    typeOfEmergency: "",
    location: "",
    description: "",
    imageUrl: "",
    status: "",
  });

  const { typeOfEmergency, location, description, imageUrl, status } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const details = {
      typeOfEmergency,
      location,
      description,
      imageUrl,
      status,
    };
    console.log(details);
    createUser(details).then((res) => {
      if (!res.status) {
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: "Signup was unsuccessful! Please check the console.",
        });
      }
      navigate(PATHS.HOMEPAGE);
    });
  }
  return (
    <div className="create-emergency">
      <div className="signinParent">
        <div className="signup">
          <div className="container">
            <form className="signupform" onSubmit={handleFormSubmission}>
              <div className="form-group">
                <label htmlFor="inputEmail">location</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                  placeholder="location"
                  name="location"
                  value={location}
                  onChange={handleInputChange}
                  required
                ></input>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputName">Type of Emergency</label>
                  <select
                    className="form-select form-control"
                    aria-label="Default select example"
                    name="typeOfEmergency"
                    onChange={handleInputChange}

                  >
                    <option>Type of Emergency</option>
                    <option value="Medical">Medical</option>
                    <option value="Fire">Fire</option>
                    <option value="Shoot Out">Shoot Out</option>
                    <option value="Accident">Accident</option>
                  </select>
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="inputEmergenctContactPhone">Status</label>
                  <select
                    className="form-select form-control"
                    aria-label="Default select example"
                    name="status"
                    onChange={handleInputChange}
                  >
                    <option>Emergency Status</option>
                    <option value="Active">Active</option>
                    <option value="Attended">Attended</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputPhone">Description</label>
                <textarea
                  className="form-control"
                  placeholder="Shortly Describe the Emergency"
                  id="floatingTextarea"
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              {error && (
                <div className="error-block">
                  <p>There was an error submiting the form:</p>
                  <p>{error.message}</p>
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary font-weight-bold"
              >
                Call for Help
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEmargency;
