import { Outlet } from "react-router-dom";

import React from "react";
import Header from "@/components/Header/Header";
import Aside from "@/components/Aside/Aside";

function Layout() {
  return (
    <>
      <Header />
      <div className="flex">
        <Aside />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
