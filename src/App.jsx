import { Routes, Route, Navigate } from "react-router-dom";
import OnBoarding from "./components/OnBoarding";
import HomePage from "./components/HomePage";
import { AuthContext } from "./api/AuthContext.jsx";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ModalError from "./components/ModalError";
import { useContext } from "react";
import ForgotPassword from "./components/ForgotPassword";
import CreateFirstCourse from "./components/CreateFirstCourse";
import Profile from "./components/Profile";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  
  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to={"/home"}/>: <OnBoarding />}>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="/home" element={isLoggedIn ? <HomePage/> : <Navigate to={"/"}/>}/>
        <Route path="/create" element={isLoggedIn ? <CreateFirstCourse/> : <Navigate to={"/"}/>}/>
        <Route path="/profile" element={isLoggedIn ? <Profile/> : <Navigate to={"/"}/>}/>
      </Routes>
      
      <ModalError />
    </>
  );
}

export default App;
