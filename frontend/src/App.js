import { createContext, useState } from "react";
import "./App.css";
import NotFound from "./components/404-notFound/NotFound";
import Login from "./components/login/Login";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import MyProfile from "./components/myProfile/MyProfile";
import FriendProfile from "./components/friend/FriendProfile";
export const usersContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("UI")) || {}
  );

  return (
    <usersContext.Provider
      value={{
        token,
        setToken,
        userInfo,
        setUserInfo,
      }}
    >
      <>
        {/* <Login /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {token && <Route path="/home" element={<Home />} />}
          {token && <Route path="/profile" element={<MyProfile />} />}
          {token && <Route path="/friend/:id" element={<FriendProfile />} />} 

          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </usersContext.Provider>
  );
}

export default App;
