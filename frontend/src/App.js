import { createContext, useState } from "react";
import "./App.css";
import NotFound from "./components/404-notFound/NotFound";
import Login from "./components/login/Login";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import MyProfile from "./components/myProfile/MyProfile";
export const usersContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("UI")) || {}
  );
  const [likedPosts, setLikedPosts] = useState(
    JSON.parse(localStorage.getItem("likedPosts")) || []
  );
  const [following, setFollowing] = useState(
    JSON.parse(localStorage.getItem("following")) || []
  );

  console.log(userInfo);
  return (
    <usersContext.Provider
      value={{
        token,
        setToken,
        userInfo,
        setUserInfo,
        likedPosts,
        setLikedPosts,
        following,
        setFollowing,
      }}
    >
      <>
        {/* <Login /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {token && <Route path="/home" element={<Home />} />}
          {token && <Route path="/profile" element={<MyProfile />} />}

          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </usersContext.Provider>
  );
}

export default App;
