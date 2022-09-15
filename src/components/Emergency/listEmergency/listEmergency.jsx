import "./listEmergency.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as USER_HELPERS from "../../../utils/userToken";
import * as PATHS from "../../../utils/paths";
import { useNavigate } from "react-router-dom";
const URL = "http://localhost:5005/api/events";

function ListEmergency(props) {
  const [emergency, setEmergency] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(URL, {
        headers: {
          Authorization: USER_HELPERS.getUserToken(),
        },
      })
      .then((res) => {
        setEmergency(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="listEmergency">
      <div className="emergencyCard d-flex">
        {emergency.map((item, index) => {
          return (
            <div
              className="card"
              key={index}
              style={{ width: "18rem", margin: "2em" }}
            >
              <img src={item.imageUrl} className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title">{item.typeOfEmergency} Emergency</h5>
                <p className="card-text">{item.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Location: {item.location}</li>
              </ul>
              <div className="card-body">
                <button
                  className="btn btn-primary"
                  onClick={(props) => {
                    navigate("/emergency/detail/" + item._id);
                  }}
                >
                  Details
                </button>
              </div>
              <div
                className="card-footer"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {item.status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListEmergency;
