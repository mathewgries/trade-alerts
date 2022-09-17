import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ls from "local-storage";
import { Link } from "react-router-dom";
import TickerField from "../inputFields/TickerField";
import NoteField from "../inputFields/NoteField";

export default function AlertDetailsEdit(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [alertList, setAlertList] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  const fetchData = async () => {
    try {
      const alerts = await fetchAlerts();
      let alert;

      for (let i = 0; i < alerts.length; i++) {
        if (alerts[i].id == id) {
          alert = alerts[i];
        }
      }

      setAlertList(alerts);
      setAlert(alert);
    } catch (e) {
      console.error(e.message);
    }
  };

  const fetchAlerts = async () => {
    try {
      return await ls.get("trade-alerts");
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleSetTicker = (value) => {
    setAlert((prev) => ({ ...prev, ticker: value }));
  };

  const handleSetNote = (value) => {
    setAlert((prev) => ({ ...prev, note: value }));
  };

  const saveAlert = async (e) => {
    e.preventDefault();

    const data = alertList.map((x) => (x.id == alert.id ? alert : x));

    try {
      await ls.set("trade-alerts", data);
      navigate("/");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="page-container">
      <div>
        <header>
          <h3>Edit Alert Details</h3>
        </header>
      </div>
      {!isLoading && (
        <form className="form-wrapper" onSubmit={saveAlert}>
          <TickerField handleSetTicker={handleSetTicker} ticker={alert.ticker} />
          <NoteField note={alert.note} handleSetNote={handleSetNote} />
          <div className="btn-group-wrapper">
            <div>
              <button className="btn btn-primary">save</button>
            </div>
            <div>
              <Link to="/" className="btn btn-success">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
