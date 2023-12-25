import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Routes from "./Routes";
import Base from "../views/Base";


const router = createBrowserRouter([
  {
    element: <Base />,
    children: [
      ...Routes.map((route) => ({
        path: route.path,
        element: <route.view />,
      })),
    ],
  },
]);

export default router;
