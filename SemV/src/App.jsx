// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scanner from "./pages/Scanner";
import PasswordChecker from "./pages/PasswordMaker";
import PasswordManager from "./pages/PasswordManager";
import NavBar from "./pages/nav"; // Make sure this path is correct
import PasswordMaker from "./pages/PasswordMaker";
import AuthenticatedWrapper from "./AuthenticatedWrapper"; // adjust the import path as needed

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route
            path="/scanner"
            element={
              <AuthenticatedWrapper>
                <Scanner />
              </AuthenticatedWrapper>
            }
          />
          <Route
            path="/password-checker"
            element={
              <AuthenticatedWrapper>
                <PasswordChecker />
              </AuthenticatedWrapper>
            }
          />
          <Route
            path="/password-maker"
            element={
              <AuthenticatedWrapper>
                <PasswordMaker />
              </AuthenticatedWrapper>
            }
          />
          <Route
            path="/password-manager"
            element={
              <AuthenticatedWrapper>
                <PasswordManager />
              </AuthenticatedWrapper>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
