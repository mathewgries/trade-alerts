import React from "react";
import { Link } from "react-router-dom";

export default function Guides() {
  return (
    <div className="page-container">
      <div className="form-wrapper">
        <div>
          <Link to="/guides/create-api-account">Create API Account</Link>
        </div>
				<div>
          <Link to="/guides/app-install">Installing the App</Link>
        </div>
        <div>Registering your app</div>
        <div>Authenticating your app</div>
      </div>
    </div>
  );
}
