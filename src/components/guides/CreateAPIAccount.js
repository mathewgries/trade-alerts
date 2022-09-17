import React from "react";

export default function CreateAPIAccount() {
  return (
    <div className="page-container">
      <div>
        <header>
          <h3>Create API Account</h3>
        </header>
      </div>
      <div className="form-wrapper">
        <div>
          Step 1:{" "}
          <p>
            <a href="https://developer.tdameritrade.com/" target="_blank">
              Visit the API website
            </a>
          </p>
          Step 2:{" "}
          <p>
            Click the "Register" link in the top right of the navigation bar at the top of the page
          </p>
          Step 3:{" "}
          <p>
            Fill out the popup form. Click the "Create new account" bottom at the bottom of the form
            when complete.
          </p>
        </div>
      </div>
    </div>
  );
}
