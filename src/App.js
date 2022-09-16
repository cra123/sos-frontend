import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { getLoggedIn, logout } from "./services/auth";
import routes from "./config/routes";
import * as USER_HELPERS from "./utils/userToken";
import * as PATHS from "../utils/paths";

import Nav from "./components/Overview/Nav/Nav";
import ShowEmergencyDetails from "./pages/Emergency/showEmergencyDetails";
import ShowUpdateEmergency from "./pages/Emergency/showUpdateEmergency";
const navigate = useNavigate
export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      return setIsLoading(false);
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      setIsLoading(false);
    });
  }, []);

  function handleLogout() {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      setUser(null);
      return setIsLoading(false);
    }
    setIsLoading(true);
    logout(accessToken).then((res) => {
      if (!res.status) {
        // deal with error here
        console.error("Logout was unsuccessful: ", res);
      }
      USER_HELPERS.removeUserToken();
      setIsLoading(false);
      navigate(PATHS.HOMEPAGE)
      return setUser(null);
      
    });
  }

  function authenticate(user) {
    setUser(user);
  }

  if (isLoading) {
    return <h4>Loading</h4>;
  }
  return (
    <div className="App">

      <Nav handleLogout={handleLogout} user={user} />
      <Routes>
        <Route path="/emergency/detail/:emergencyid" element={<ShowEmergencyDetails />} />
        <Route path="/emergency/detail/update/:emergencyid" element={<ShowUpdateEmergency />} />
        {routes({ user, authenticate, handleLogout }).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}
