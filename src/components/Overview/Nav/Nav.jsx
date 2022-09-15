import "./Nav.css";
import * as PATHS from "../../../utils/paths";
import React from "react";

function Nav(props) {
  console.log(props);
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
                <ul className="nav nav-tabs nav-bg">
                  <li className="nav-item dropdown ">
                    <a
                      className="nav-link dropdown-toggle text-light"
                      data-toggle="dropdown"
                      href={PATHS.EMERGENCYLIST}
                      role="button"
                      aria-expanded="false"
                    >
                      Emergency
                    </a>
                    <div className="dropdown-menu ">
                      <a className="dropdown-item" href={PATHS.CREATEEMERGENCY}>
                        Broadcast Emergency
                      </a>
                      <a className="dropdown-item" href={PATHS.EMERGENCYLIST}>
                        Show Emergency
                      </a>
                    </div>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link text-light" href={PATHS.USERLIST}>
                      Users
                    </a>
                  </li> */}
                </ul>
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
