import { Navigate } from "react-router-dom";

import Signup from "../pages/Signup";
import ProtectedPage from "../pages/ProtectedPage";
import * as PATHS from "../utils/paths";

import ShowSignup from "../pages/auth/signup2";
import ShowHomepage from "../pages/Overview/homepage";
import ShowLogin from "../pages/auth/login";

import ShowCreateEmergency from "../pages/Emergency/showCreateEmergency";

const routes = (props) => {
  const { user } = props;
  return [
    {
      path: PATHS.HOMEPAGE,
      element: <ShowHomepage {...props} />,
    },
    {
      path: PATHS.SIGNUPPAGE,
      element: <Signup {...props} />,
    },
    // New Path
    {
      path: PATHS.CREATEEMERGENCY,
      element: <ShowCreateEmergency {...props} />,
    },
    {
      path: PATHS.SIGNUPPAGE2,
      element: <ShowSignup {...props} />,
    },
    {
      path: PATHS.LOGINPAGE,
      element: <ShowLogin {...props} />,
    },
    {
      path: PATHS.PROTECTEDPAGE,
      element: user ? (
        <ProtectedPage {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
  ];
};

export default routes;
