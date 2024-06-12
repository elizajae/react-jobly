import { Link } from "react-router-dom";

export const Navbar = () => {
  const loggedIn = localStorage.getItem("JOBLY_TOKEN");

  return (
    <nav className="navbar">
      <ul>
        {!loggedIn && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {loggedIn && (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/companies">Companies</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
