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
import VideoDetailPage from "./components/VideoPage/VideoDetailPage.jsx";
import ChannelVideoListPage from "./components/ChannelPage/ChannelVideoListPage.jsx";
import Channel from "./components/ChannelPage/Channel.jsx";
import ChannelPlayListPage from "./components/ChannelPage/ChannelPlayListPage.jsx";
import ChannelTweetPage from "./components/ChannelPage/ChannelTweetPage.jsx";
import ChannelSubscribedPage from "./components/ChannelPage/ChannelSubscribedPage.jsx";
import ChannelPlayListVideosPage from "./components/ChannelPage/ChannelPlayListVideosPage.jsx";
import MyChannel from "./components/MyChannel/MyChannel.jsx";
import MyChannelVideoPage from "./components/MyChannel/MyChannelVideoPage.jsx";
import MyChannelPlaylistPage from "./components/MyChannel/MyChannelPlaylistPage.jsx";
import MyChannelTweetPage from "./components/MyChannel/MyChannelTweetPage.jsx";
import MyChannelSubedPage from "./components/MyChannel/MyChannelSubedPage.jsx";
import UploadVideoPopout from "./components/MyChannel/UploadPopOut/UploadVideoPopout.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import EditPersonalPageInfo from "./components/MyChannel/EditMyChannel/EditPersonalPageInfo.jsx";
import Terms from "./components/ExtrasPage/Terms.jsx";

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
    path: "/channel/videos",
    element: (
      <>
        <Header />
        <div className="flex">
          <Aside />
          <Channel Compo={ChannelVideoListPage} />
        </div>
      </>
    ),
  },
  {
    path: "/channel/playlist",
    element: (
      <>
        <Header />
        <div className="flex">
          <Aside />
          <Channel Compo={ChannelPlayListVideosPage} />
        </div>
      </>
    ),
  },
  {
    path: "/channel/tweet",
    element: (
      <>
        <Header />
        <div className="flex">
          <Aside />
          <Channel Compo={ChannelTweetPage} />
        </div>
      </>
    ),
  },
  {
    path: "/channel/subscribed",
    element: (
      <>
        <Header />
        <div className="flex">
          <Aside />
          <Channel Compo={ChannelSubscribedPage} />
        </div>
      </>
    ),
  },
  {
    path: "/mychannel/videos",
    element: (
      <>
        <Header />
        <div className="flex">
          <Aside />
          <MyChannel Compo={MyChannelVideoPage} />
        </div>
      </>
    ),
  },
  {
    path: "/mychannel/playlist",
    element: (
      <>
        <Header />
        <div className="flex">
          <Aside />
          <MyChannel Compo={MyChannelPlaylistPage} />
        </div>
      </>
    ),
  },
  {
    path: "/mychannel/tweet",
    element: (
      <>
        <Header />
        <div className="flex">
          <Aside />
          <MyChannel Compo={MyChannelTweetPage} />
        </div>
      </>
    ),
  },
  {
    path: "/mychannel/subscribed",
    element: (
      <>
        <Header />
        <div className="flex">
          <Aside />
          <MyChannel Compo={MyChannelSubedPage} />
        </div>
      </>
    ),
  },
  {
    path: "/video/:id",
    element: (
      <>
        <Header />
        <VideoDetailPage />
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
  {
    path: "/x",
    element: <EditPersonalPageInfo />,
  },
  {
    path: "/abc",
    element: <Terms />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
