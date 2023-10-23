// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Scanner from "./pages/Scanner";
// import PasswordChecker from "./pages/PasswordMaker";
// import PasswordManager from "./pages/PasswordManager";
// import NavBar from "./pages/nav";
// import PasswordMaker from "./pages/PasswordMaker";
// const App = () => {
//   return (
//     <>
//     <NavBar />
//     <div className="container">
//     <Router>
//       <Routes>
//         <Route path="/scanner" element={<Scanner />}></Route>
//         <Route path="/password-checker" element={<PasswordChecker />}></Route>
//         <Route path="/password-maker" element={<PasswordMaker />}></Route>
//         <Route path="/password-manager" element={<PasswordManager />}></Route>
//       </Routes>
//     </Router>
//     </div>
//     </>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scanner from "./pages/Scanner";
import PasswordChecker from "./pages/PasswordMaker";
import PasswordManager from "./pages/PasswordManager";
import NavBar from "./pages/nav"; // Make sure this path is correct
import PasswordMaker from "./pages/PasswordMaker";

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/password-checker" element={<PasswordChecker />} />
          <Route path="/password-maker" element={<PasswordMaker />} />
          <Route path="/password-manager" element={<PasswordManager />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
