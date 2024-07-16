import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import { Login } from "./components/Login.jsx";
import AuthLogin from "./components/AuthPages/AuthLogin.jsx";
import AuthRegister from "./components/AuthPages/AuthRegister.jsx";
import Header from "./components/Header/Header.jsx";
import Aside from "./components/Aside/Aside.jsx";
import VideoListingCardPage from "./components/VideoPage/VideoListingCardPage.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: (
      <>
        <Header />
        <div className="flex">
          <Aside />
          <Home />
        </div>
      </>
    ),
  },
  {
    path: "/home2",
    element: (
      <>
        <Header />
        <div className="flex">
          <Aside />
          <VideoListingCardPage />
        </div>
      </>
    ),
  },
  {
    path: "/login",
    element: <AuthLogin />,
  },
  {
    path: "/register",
    element: <AuthRegister />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
