import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div className="navbar bg-light">
      <div>
        <Link to="/">
          <div className="navbar-brand">TradeAlerts</div>
        </Link>
      </div>
      <div className="navbar-link-group">
        <div>
          <Link className="poly-link" to="/auth-tokens">
            Authorization
          </Link>
        </div>
				<span>|</span>
				<div>
          <Link className="poly-link" to="/guides">
            Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
