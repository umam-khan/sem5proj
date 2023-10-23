import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="logo">UnHackMe</div>
        <ul>
          <li><Link to="/scanner" style={{ textDecoration: 'none' }}>Scanner</Link></li>
          <li><Link to="/password-manager" style={{ textDecoration: 'none' }}>Manager</Link></li>
          <li><Link to="/password-maker" style={{ textDecoration: 'none' }}>Generator</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
