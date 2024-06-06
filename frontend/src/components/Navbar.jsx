import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isAuthorized, userRole, logout } = useAuth();

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Home
      </Link>
      <ul>
        <CustomLink to="/questions">Questions</CustomLink>
        {isAuthorized && userRole === "admin" && (
          <CustomLink to="/my-questions">My Questions</CustomLink>
        )}
        {isAuthorized ? (
          <>
            <CustomLink to="/login" onClick={logout}>
              Log Out
            </CustomLink>
          </>
        ) : (
          <>
            <CustomLink to="/login">Log In</CustomLink>
            <CustomLink to="/register">Register</CustomLink>
          </>
        )}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
