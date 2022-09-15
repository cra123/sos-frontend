import "./Landing.css"
import * as PATHS from "../../../utils/paths";

function Landing(props) {
    return (
      <div className="main-intro" style={{}}>
        <div>
          <div>
            <h1 className="title-intro">
              Surrounded by a community that cares
            </h1>
          </div>
          <div className="d-flex">
            <img
              src="https://images.unsplash.com/photo-1626546849705-f29e2f771df9?ixlib=rb-1.2.1
                &ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&
                auto=format&fit=crop&w=1889&q=80"
              className="intro-image"
              alt="..."
            ></img>
            <div className="landing-intro">
              <div className="landing-intro-desc">
                <p>
                  SoS Alarm is a community based app that allows you to send out
                  an alert to your friends and family when you are in danger.
                </p>
              </div>
              {props.user ? (
                <div className="intro-buttom">
                  <a
                    className="btn btn-primary btn-lg"
                    href={PATHS.CREATEEMERGENCY}
                    role="button"
                  >
                    Broadcast Emergency
                  </a>
                </div>
              ) : (
                <div className="intro-buttom">
                  <a
                    className="btn btn-primary btn-lg"
                    href={PATHS.SIGNUPPAGE2}
                    role="button"
                  >
                    Start Today
                  </a>
                </div>
              )}
            </div>

            <img
              src="https://images.unsplash.com/photo-1626546849705-f29e2f771df9?ixlib=rb-1.2.1
                &ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&
                auto=format&fit=crop&w=1889&q=80"
              className="intro-image"
              alt="..."
            ></img>
          </div>
          <div className="landing-intro-desc-2">
            <em>"Creating Safe communities"</em>
          </div>
        </div>
      </div>
    );
}


export default Landing;