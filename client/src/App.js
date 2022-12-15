import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
// Redux
import { Provider } from "react-redux";
import store from "./store";

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect (() => {
    store.dispatch(loadUser());
  }, []);
  return (
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
)};

export default App;
