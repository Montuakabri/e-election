import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import "react-pro-sidebar/dist/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-redux";
import { store } from "./redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProSidebarProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ProSidebarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
