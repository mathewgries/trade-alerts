import React, { useState, useEffect } from "react";
import ls from "local-storage";
import { Link, useNavigate } from "react-router-dom";

export default function CredentialsUpdate(props) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ client_id: "", redirect_uri: "" });

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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const saveCredentials = async (e) => {
    e.preventDefault();
    const { client_id, redirect_uri } = credentials;
    try {
      const data = { client_id, redirect_uri };
      await ls.set("site-credentials", data);
      navigate("/auth-tokens");
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="page-container">
      <header>
        <h4>Update Site Credentials</h4>
      </header>
      <form className="form-wrapper" onSubmit={saveCredentials}>
        <div className="form-group">
          <label>Client ID</label>
          <input
            className="form-control"
            type="text"
            value={credentials.client_id}
            name="client_id"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Redirect URI</label>
          <input
            className="form-control"
            type="text"
            value={credentials.redirect_uri}
            name="redirect_uri"
            onChange={handleOnChange}
          />
        </div>
        <div className="btn-group-wrapper">
          <div>
            <button
              className="btn btn-primary"
              disabled={credentials.client_id === "" || credentials.redirect_uri === ""}
            >
              Save
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
