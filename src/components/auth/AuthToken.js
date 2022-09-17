import React, { useState, useEffect } from "react";
import ls from "local-storage";
import { refreshAuthToken } from "../../api/tdaApi";

export default function RefreshToken(props) {
  const [authToken, setAuthToken] = useState({
    access_token: "",
    expirationDate: "",
    scope: "",
    token_type: "",
  });

  useEffect(() => {
    loadAuthTokenData();
  }, []);

  const loadAuthTokenData = async () => {
    try {
      const data = await ls.get("auth-token");
      if (data) {
        setAuthToken(data);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleGetTokenRequest = async () => {
    try {
      const data = await refreshAuthToken();
      setAuthToken(data);
      await ls.set("auth-token", data);
    } catch (e) {
      console.error(e.message);
    }
  };

  const convertDate = () => {
    return new Date(authToken.expirationDate).toLocaleString();
  };

  return (
    <div className="form-wrapper">
      <div>
        <h4>Auth Token</h4>
      </div>
      <div className="form-group">
        <label>Token Type</label>
        <div className="form-control">{authToken.token_type}</div>
      </div>
      <div className="form-group">
        <label>Expiration Time</label>
        <div className="form-control">{convertDate()}</div>
      </div>
      <div className="btn-group-wrapper">
        <div>
          <button className="btn btn-primary" onClick={handleGetTokenRequest}>
            Refresh
          </button>
        </div>
        <div>
          <p>
            These will auto refresh by the app. TD Ameritrade rate limits calls to this API. You can
            refresh your token, just be aware of frequency
          </p>
        </div>
      </div>
    </div>
  );
}
