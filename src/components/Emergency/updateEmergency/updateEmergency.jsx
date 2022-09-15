import "./updateEmergency.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../utils/paths";
import * as USER_HELPERS from "../../../utils/userToken";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateEmergency() {
  const { emergencyid } = useParams();
  const [emergency, setEmergency] = useState({});
  const [currentEmergency, setCurrentEmergency] = useState({});
  const [syncStatus, setSyncStatus] = useState(true);

  useEffect(() => {
    const EVENTURL = `${process.env.REACT_APP_SERVER_URL}/events`;
    if (syncStatus) {
      axios
        .get(EVENTURL, {
          headers: {
            Authorization: USER_HELPERS.getUserToken(),
          },
        })
        .then((res) => {
          setEmergency(res.data);
          console.log(emergency);
          return emergency;
        })
        .then((emergency) => {
          const getEmergencyDetails = emergency.find(
            (item) => item._id === emergencyid
          );
          console.log(getEmergencyDetails);
          return getEmergencyDetails;
        })
        .then((getEmergencyDetails) => {
          setCurrentEmergency(getEmergencyDetails);
          setSyncStatus(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emergencyid, emergency, syncStatus]);

  const [form, setForm] = useState({
    typeOfEmergency: currentEmergency.typeOfEmergency,
    location: currentEmergency.location,
    description: currentEmergency.description,
    imageUrl: "",
    status: currentEmergency.status,
    geolocation_lat: "",
    geolocation_lng: "",
  });

  const { typeOfEmergency, location, description, imageUrl, status } = form;

  const [error, setError] = useState(null);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [geoStatus, setGeoStatus] = useState("");

  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function getLocation(event) {
    event.preventDefault();
    if (!navigator.geolocation) {
      console.log("GeoLocation not supported");
      setGeoStatus("GeoLocation not supported");
    } else {
      console.log("Loading ...");
      setGeoStatus("Loading");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoStatus(null);
          console.log(position.coords.latitude);
          setLat(position.coords.latitude);
          console.log(position.coords.longitude);
          setLng(position.coords.longitude);
        },
        () => {
          console.log("Can retrive info");
          setGeoStatus("Can retrive info");
        }
      );
    }
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const details = {
      typeOfEmergency,
      location,
      description,
      imageUrl,
      status,
      geolocation_lat: lat,
      geolocation_lng: lng,
    };
    const token = USER_HELPERS.getUserToken();
    const updateEmergencyURL = `${process.env.REACT_APP_SERVER_URL}/events/${emergencyid}`;
    const headers = { Authorization: `${token}` };
    axios.put(`${updateEmergencyURL}`, details, { headers }).then((res) => {
      if (!res.status) {
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: "Signup was unsuccessful! Please check the console.",
        });
      }
      navigate(PATHS.EMERGENCYLIST);
    });
  }
  console.log(currentEmergency);
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
                  value={currentEmergency.location}
                  onChange={handleInputChange}
                  required
                ></input>
                <button
                  onClick={getLocation}
                  className="btn btn-primary font-weight-bold"
                  style={{ marginTop: "10px" }}
                >
                  Get GeoLocation
                </button>
                <p>{geoStatus}</p>
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
                    <option value={currentEmergency.typeOfEmergency}>
                      Type of Emergency
                    </option>
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
                    <option value={currentEmergency.status}>
                      Emergency Status
                    </option>
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
                  value={currentEmergency.description}
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
                Update Emergency
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateEmergency;
