import React, { useState, useEffect } from "react";
import ls from "local-storage";
import { Link, useNavigate } from "react-router-dom";

export default function RefreshTokenUpdate(props) {
  const navigate = useNavigate();
  const [refresh_token, setRefreshToken] = useState("");

  useEffect(() => {
    loadRefreshToken();
  }, []);

  const loadRefreshToken = async () => {
    try {
      const data = ls.get("refresh-token");
      if (data) {
        setRefreshToken(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setRefreshToken(value);
  };

  const saveRefreshToken = async (e) => {
    e.preventDefault();

    try {
      await ls.set("refresh-token", refresh_token);
      navigate("/auth-tokens");
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="page-container">
      <header>
        <h4>Update Refresh Token</h4>
      </header>
      <form className="form-wrapper" onSubmit={saveRefreshToken}>
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
            <button className="btn btn-primary" disabled={refresh_token === ""}>
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
