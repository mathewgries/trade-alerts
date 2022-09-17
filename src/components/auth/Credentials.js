import React, { useState, useEffect } from "react";
import ls from "local-storage";
import { Link } from "react-router-dom";

export default function Credentials(props) {
  const [credentials, setCredentials] = useState({
    client_id: "",
    redirect_uri: "",
  });

  useEffect(() => {
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    try {
      const data = await ls.get("site-credentials");
      if (data) {
        setCredentials(data);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="form-wrapper">
      <div>
        <h4>Site Credentials</h4>
      </div>

      <div>
        <div className="form-group">
          <label>Client ID</label>
          <div className="form-control">{credentials.client_id}</div>
        </div>
        <div className="form-group">
          <label>Redirect URI</label>
          <div className="form-control">{credentials.redirect_uri}</div>
        </div>
        <div className="btn-group-wrapper">
          <Link className="btn btn-primary" to="/credentials/update">
            Update
          </Link>
        </div>
      </div>
    </div>
  );
}
