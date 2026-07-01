import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ProgramProvider } from "./store/program";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProgramProvider>
      <RouterProvider router={router} />
    </ProgramProvider>
  </React.StrictMode>
);
