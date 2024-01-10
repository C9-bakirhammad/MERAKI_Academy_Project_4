import { createContext, useState } from "react";
import "./App.css";
import NotFound from "./components/404-notFound/NotFound";
import Login from "./components/login/Login";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
export const usersContext = createContext();

function App() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState("");

  return (
    <usersContext.Provider value={{ token, setToken, userInfo, setUserInfo }}>
      <>
        {/* <Login /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home/>}/>

          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </usersContext.Provider>
  );
}

export default App;
