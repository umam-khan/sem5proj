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
        <Route path="/scanner" element={<PasswordChecker />}></Route>
        <Route path="/scanner" element={<PasswordManager />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
