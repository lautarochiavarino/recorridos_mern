import React, { Fragment } from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";

const App = () => (
 
<BrowserRouter>

<Navbar />

<Routes>
<Fragment>
  <Route path="/" element={<Landing/>} />

    <Route path="/register" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
   
     
   
  
  </Fragment>
</Routes>
</BrowserRouter>

);

export default App;
