import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import "./App.css";

//redux
import { Provider } from "react-redux";
import store from "./store";
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <section className='container'>
      <Alert />
      <Routes>
        <Fragment>
          <Route path="/" element={<Landing />} />
          
          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Fragment>
      </Routes>
      </section>
    </BrowserRouter>
  </Provider>
);

export default App;
