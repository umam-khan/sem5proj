import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();  // Combining into a single line for cleaner code

  // Optional: You might want to handle 'isLoading' to display a loading indicator

  if (isLoading) {
    return <div>Loading...</div>; // or some loading component
  }

  return (
    <div>
      <nav>
        <div className="logo">UnHackMe</div>
        <ul>
          <li>
            <Link to="/scanner" style={{ textDecoration: "none" }}>
              Scanner
            </Link>
          </li>
          <li>
            <Link to="/password-manager" style={{ textDecoration: "none" }}>
              Manager
            </Link>
          </li>
          <li>
            <Link to="/password-maker" style={{ textDecoration: "none" }}>
              Generator
            </Link>
          </li>
          {!isAuthenticated ? (  // If not authenticated, show 'Log In'
            <li>
              <button onClick={() => loginWithRedirect()}>Log In</button>
            </li>
          ) : (
            <li>
              <button
                onClick={() =>
                  logout({ returnTo: window.location.origin })  // corrected 'logoutParams' to just 'returnTo'
                }
              >
                Log Out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
