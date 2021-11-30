import "./Nav.css";
import { Link } from "react-router-dom";

export function Nav() {
  return (
    <div className="nav">
      <div className="nav-links">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/test" className="link">
          Test
        </Link>
      </div>
    </div>
  );
}
