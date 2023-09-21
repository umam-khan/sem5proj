import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scanner from "./pages/Scanner";
import PasswordChecker from "./pages/PasswordMaker";
import PasswordManager from "./pages/PasswordManager";
import NavBar from "./pages/nav";
const App = () => {
  return (
    <>
    <NavBar />
    <div className="container">
    <Router>
      <Routes>
        <Route path="/scanner" element={<Scanner />}></Route>
        <Route path="/password-checker" element={<PasswordChecker />}></Route>
        <Route path="/password-manager" element={<PasswordManager />}></Route>
      </Routes>
    </Router>
    </div>
    </>



  );
};

export default App;
