import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot
import { Provider } from "react-redux";
import store from "./redux/store";
import { ConfigProvider } from "./context/ConfigContext";
import App from "./App";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </Provider>
);
