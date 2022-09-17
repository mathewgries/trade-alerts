import React, { useState, useEffect } from "react";
import ls from "local-storage";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PriceField from "../inputFields/PriceField";
import AlertTypeField from "../inputFields/AlertTypeField";

export default function AlertEdit(props) {
  const alertTypeList = ["alert", "entry", "stop loss", "target"];
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [alertList, setAlertList] = useState([]);
  const [mainId, setMainId] = useState("");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchAlerts();
    setIsLoading(false);
  }, []);

  const handleSetAlertPrice = ({ value }) => {
    setAlert((prev) => ({ ...prev, alertPrice: value }));
  };

  const handleSetAlertType = (value) => {
    setAlert((prev) => ({ ...prev, alertType: value }));
  };

  const fetchAlerts = async () => {
    let found = false;
    try {
      const allAlerts = await ls.get("trade-alerts");
      for (let i = 0; i < allAlerts.length; i++) {
        const alerts = allAlerts[i].alerts;
        for (let j = 0; j < alerts.length; j++) {
          if (alerts[j].id == id) {
            setAlert(alerts[j]);
            setMainId(allAlerts[i].id);
            found = true;
            break;
          }
        }
        if (found) {
          break;
        }
      }
      setAlertList(allAlerts);
    } catch (e) {
      console.error(e.message);
    }
  };

  const saveAlert = async (e) => {
    e.preventDefault();

    const data = alertList.map((x) =>
      x.id == mainId
        ? { ...x, alerts: x.alerts.map((y) => (y.id == alert.id ? { ...alert } : y)) }
        : x
    );

    try {
      await ls.set("trade-alerts", data);
      navigate("/");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="page-container">
      <header>New Alert</header>
      {!isLoading && (
        <form className="form-wrapper" onSubmit={saveAlert}>
          <div>
            <PriceField handleSetAlertPrice={handleSetAlertPrice} alertPrice={alert.alertPrice} />
            <AlertTypeField
              handleSetAlertType={handleSetAlertType}
              alertTypeList={alertTypeList}
              alertType={alert.alertType}
            />
          </div>
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
