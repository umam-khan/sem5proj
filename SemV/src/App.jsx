import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scanner from "./pages/Scanner";
import PasswordChecker from "./pages/PasswordMaker";
import PasswordManager from "./pages/PasswordManager";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/scanner" element={<Scanner />}></Route>
        <Route path="/password-checker" element={<PasswordChecker />}></Route>
        <Route path="/password-manager" element={<PasswordManager />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
