import React from "react";
import Credentials from "./Credentials";
import RefreshToken from "./RefreshToken";
import AuthToken from "./AuthToken";

export default function AuthPage() {
  return (
    <div className="page-container">
      <header>
        <h3>Auth Page</h3>
      </header>

      <div>
        <Credentials />
      </div>

      <div>
        <RefreshToken />
      </div>

      <div>
        <AuthToken />
      </div>
    </div>
  );
}
