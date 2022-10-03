import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Reservations from "./pages/reservations/Reservations";
import {AuthContext} from './context/AuthContext';
import {useContext,useState} from 'react';
import AuthenticationService from './pages/login/AuthenticationService'

function App() {
  const [isLoggedIn,setisLoggedIn] =useState(AuthenticationService.isUserLoggedIn());

  // const user = useContext(AuthContext);
  // if(user === null){
  //   isLoggedIn = true;
  // }
  // console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate replace to="/estivages" /> : <Navigate replace to="/login" />}/>
        <Route path="/estivages" element={isLoggedIn ? <List /> : <Navigate to="/login" />}/>
        <Route path="/estivage/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login setisLoggedIn={setisLoggedIn} />}/>
        <Route path="/Reservations" element={<Reservations/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
