import React, { useState } from "react";
import ls from "local-storage";
import { authenticateSite } from "../../api/tdaApi";
import { Link, useNavigate } from "react-router-dom";

export default function RefreshTokenUpdate(props) {
  const navigate = useNavigate();
  const [refresh_token, setRefreshToken] = useState("");

  const handleAuthenticateSite = async () => {
    try {
      await authenticateSite();
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnChange = () => {};

  return (
    <div className="page-container">
      <header>
        <h4>Authenticate Your App</h4>
      </header>
      <div className="form-wrapper">
      <div>
        <h5>Step 1: Get Code</h5>
				<div>
					<a href="https://developer.tdameritrade.com/content/simple-auth-local-apps"></a>
				</div>
      </div>
			</div>
      <form className="form-wrapper">
        <div className="form-group">
          <label>Token</label>
          <textarea
            className="form-control"
            type="text"
            value={refresh_token}
            name="refresh_token"
            onChange={handleOnChange}
          />
        </div>

        <div className="btn-group-wrapper">
          <div>
            <button className="btn btn-primary" onClick={handleAuthenticateSite}>
              Authenticate
            </button>
          </div>

          <div>
            <Link className="btn btn-success" to="/auth-tokens">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
