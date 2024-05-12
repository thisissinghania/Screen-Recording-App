import React from "react";
import EditMedia from "./Pages/EditMedia";
import FirstRecord from "./Pages/Recording/FirstRecord";
import Wrapper from "./Pages";
import Home from "./Pages/Home";

const Routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/record",
    element: <Wrapper />,
  },
  {
    path: "/editMedia",
    element: <EditMedia />,
  },

  {
    path: "/firstRecording",
    element: <FirstRecord />,
  },
];

export default Routes;
