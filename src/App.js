import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Overview/Navbar/Navbar";
import { getLoggedIn, logout } from "./services/auth";
import routes from "./config/routes";
import * as USER_HELPERS from "./utils/userToken";

import axios from "axios";

import Nav from "./components/Overview/Nav/Nav";
import ShowEmergency from "./pages/Emergency/showEmergency";
import ShowEmergencyDetails from "./pages/Emergency/showEmergencyDetails";
// import Landing from "./components/Overview/landing/Landing";
// import Login from "./components/auth/login/login";
// import Signup2 from "./components/auth/signup/signup";
// import CreateEmargency from "./components/Emergency/createEmergency/createEmergency";


export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [emergency, setEmergency] = useState([]);

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
  const EVENTURL = "http://localhost:5005/api/events";
  useEffect(() => {
    axios
      .get(EVENTURL, {
        headers: {
          Authorization: USER_HELPERS.getUserToken(),
        },
      })
      .then((res) => {
        setEmergency(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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
      {/* <Navbar handleLogout={handleLogout} user={user} /> */}
      <Nav handleLogout={handleLogout} user={user}/>
      <Routes>
        <Route path="/emergency/detail/:emergencyid" element={<ShowEmergencyDetails emergency={emergency} />} />
        {routes({ user, authenticate, handleLogout }).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      {/* <Nav/>
      <Landing/>
      <Signup2 />
      <Login />
      <CreateEmargency /> */}
    </div>
  );
}
