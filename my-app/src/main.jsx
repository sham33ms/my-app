import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";  
// ✅ Ensure this file exists in src/
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App   />
  </React.StrictMode> 
);
