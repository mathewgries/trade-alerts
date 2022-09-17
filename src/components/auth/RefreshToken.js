import React, { useState, useEffect } from "react";
import ls from "local-storage";
import { authenticateSite } from "../../api/tdaApi";
import { Link } from "react-router-dom";


export default function RefreshToken(props) {
  const [refreshToken, setRefreshToken] = useState("");

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

	const handleAuthenticateSite = async () => {
		try{
			await authenticateSite()
		}catch(e){
			console.error(e)
		}
	}

  return (
    <div className="form-wrapper">
      <div>
        <h4>Refresh Token</h4>
      </div>
      <div className="form-group">
        <label>Token</label>
        <textarea className="form-control" defaultValue={refreshToken} disabled={true} />
      </div>
      <div className="btn-group-wrapper">
        <div>
          <Link className="btn btn-primary" to="/refresh_token/new">
            New
          </Link>
        </div>
        <div>
          <Link className="btn btn-primary" to="/refresh_token/update">
            Update
          </Link>
        </div>
      </div>
    </div>
  );
}
