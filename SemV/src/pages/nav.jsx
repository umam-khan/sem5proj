import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0(); // Combining into a single line for cleaner code

  // Optional: You might want to handle 'isLoading' to display a loading indicator

  if (isLoading) {
    return <div>Loading...</div>; // or some loading component
  }

  return (
    <div>
      <nav>
        <div className="logo" style={{ color: "purple" }}>
          UnHackMe
        </div>
        <ul>
          <li>
            <Link
              to="/scanner"
              style={{ color: "white", textDecoration: "none" }}
            >
              Scanner
            </Link>
          </li>
          <li>
            <Link
              to="/password-manager"
              style={{ color: "white", textDecoration: "none" }}
            >
              Manager
            </Link>
          </li>
          <li>
            <Link
              to="/password-maker"
              style={{ color: "white", textDecoration: "none" }}
            >
              Generator
            </Link>
          </li>
          {!isAuthenticated ? ( // If not authenticated, show 'Log In'
            <li>
              <button style={butsty} onClick={() => loginWithRedirect()}>
                Log In
              </button>
            </li>
          ) : (
            <li>
              <button
                style={butsty}
                onClick={
                  () => logout({ returnTo: window.location.origin }) // corrected 'logoutParams' to just 'returnTo'
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

const butsty = {
  width: "130px",
  height: "40px",
  borderRadius: "10px",
  backgroundColor: "white",
  color: "black",
};
export default Navbar;
