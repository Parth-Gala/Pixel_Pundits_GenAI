import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import InjectTailwind from './InjectTailwind.jsx'
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  //   <InjectTailwind>
  //   </InjectTailwind>
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
