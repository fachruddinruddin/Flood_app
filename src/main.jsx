import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import RouteList from "./RouteList.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./redux/Store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={RouteList} />
    </Provider>
  </StrictMode>
);
