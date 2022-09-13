import "./Nav.css";
import { Link } from "react-router-dom";
import * as PATHS from "../../../utils/paths";
import * as CONSTS from "../../../utils/consts";
import React from "react";

function Nav(props) {
    console.log(props)
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-warning">
        {props.user ? (
          <>
            <div className="container-fluid">
              <div className="d-flex justify-content-around me-auto flex-grow-1 p-2 ">
                <a className="navbar-brand text-light intro" href="{}">
                  SoS Alarm
                </a>
              </div>
              <div className="d-flex mb-2 align-items-start">
                <div className="p-2">
                  <a
                    className="btn btn-primary"
                    href={PATHS.CREATEEMERGENCY}
                    role="button"
                  >
                    Emergency
                  </a>
                </div>
                <div className="p-2">
                  <a
                    className="btn btn-primary"
                    href={PATHS.SIGNUPPAGE2}
                    role="button"
                  >
                    Users
                  </a>
                </div>
              </div>
              <div className="d-flex mb-2 align-items-end">
                <div className="p-2">
                  <button
                    className="btn btn-primary"
                    onClick={props.handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container-fluid">
              <div className="d-flex justify-content-around me-auto flex-grow-1 p-2 ">
                <a className="navbar-brand text-light intro" href="{}">
                  SoS Alarm
                </a>
              </div>
              <div className="d-flex mb-2 align-items-end">
                <div className="p-2">
                  <a
                    className="btn btn-primary"
                    href={PATHS.LOGINPAGE}
                    role="button"
                  >
                    Login
                  </a>
                </div>
                <div className="p-2">
                  <a
                    className="btn btn-primary"
                    href={PATHS.SIGNUPPAGE2}
                    role="button"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}

export default Nav;
