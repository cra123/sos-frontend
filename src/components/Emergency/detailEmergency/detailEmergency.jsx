import "./detailEmergency.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as USER_HELPERS from "../../../utils/userToken";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../utils/paths";

function DetailEmergency(props) {
  const { emergencyid } = useParams();

  const [emergency, setEmergency] = useState({});

  const [emergencyDetails, setEmergencyDetails] = useState({});
  const [emergencyUser, setEmergencyUser] = useState({});
  const [emergencyReaction, setEmergencyReaction] = useState();
  const [emergencyComments, setEmergencyComments] = useState({});
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();

  const { content } = emergencyComments;

  useEffect(() => {
    const EVENTURL = `${process.env.REACT_APP_SERVER_URL}/events`;
    if (status === true) {
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
          setEmergencyDetails(getEmergencyDetails);

          setEmergencyUser(getEmergencyDetails.user[0]);

          setEmergencyReaction(getEmergencyDetails.reaction);

          setStatus(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emergencyid, emergency, status]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setEmergencyComments({ ...emergencyReaction, [name]: value });
  }

  function viewMap() {
    const lat = emergencyDetails.geolocation_lat;
    const lng = emergencyDetails.geolocation_lng;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    );
  }
  function handleDelete(event) {
    event.preventDefault();
    const EVENTURL = `${process.env.REACT_APP_SERVER_URL}/events/${emergencyid}`;
    axios
      .delete(EVENTURL, {
        headers: {
          Authorization: USER_HELPERS.getUserToken(),
        },
      })
      .then((res) => {
        console.log(res);
        navigate(PATHS.EMERGENCYLIST);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleReaction(event) {
    event.preventDefault();
    const token = USER_HELPERS.getUserToken();
    const reactionURL = `${process.env.REACT_APP_SERVER_URL}/events/${emergencyid}/reactions`;
    const headers = { Authorization: `${token}` };
    const data = {
      content,
      user: emergencyUser._id,
    };
    axios.post(`${reactionURL}`, data, { headers }).then((res) => {
      console.log(res);
    });
    setStatus(true);
  }
  return (
    <div className="card">
      {emergencyDetails.status === "Active" ? (
        <div className="card-header headerEmergency">Emergency</div>
      ) : (
        <div className="card-header headerResolved">Resolved</div>
      )}
      <div className="card-body ">
        <div className="eventTitleDiv">
          <h5 className="card-title eventTitle">
            {emergencyDetails.typeOfEmergency}
          </h5>
          <button className="btn btn-primary" onClick={viewMap}>
            View Map Location
          </button>
        </div>
        <div className="eventTitleButton">
          <button
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
            onClick={(props) => {
              navigate("/emergency/detail/update/" + emergencyDetails._id);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-info"
            onClick={handleDelete}
            style={{ marginLeft: "2px" }}
          >
            Delete
          </button>
        </div>

        <h6>Description:</h6>
        <div className="eventDescription">
          <p className="card-text">{emergencyDetails.description}</p>
        </div>
      </div>
      <div className="card-footer text-muted">
        <div className="eventFooter">
          <div className="eventLocation">
            <p>Location: {emergencyDetails.location}</p>
          </div>
          <div>
            <p className="eventLocation">User: {emergencyUser.name}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="card-body">
          <form onSubmit={handleReaction}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="React Comment"
                name="content"
                value={content}
                onChange={handleInputChange}
              ></input>
              <button className="btn btn-primary" type="submit">
                React
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div className="card-body">
          <h5 className="card-title">Reactions</h5>
          <div className="reactionsBox">
            {emergencyReaction &&
              emergencyReaction.map((item, index) => {
                return (
                  <div className="reactionDetail">
                    <p key={index} className="eventContent">{item.content}</p>
                  </div>
                );
              })}
            {!emergencyReaction && <p>No Reaction</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailEmergency;
