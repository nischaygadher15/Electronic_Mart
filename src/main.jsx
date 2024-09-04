import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routing.jsx";
import { Provider } from "react-redux";
import dataStore from "./Store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={dataStore}>
    <RouterProvider router={router} />
  </Provider>
);
