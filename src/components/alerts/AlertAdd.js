import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ls from "local-storage";
import { generateId } from "../../helpers";
import { Link } from "react-router-dom";
import PriceField from "../inputFields/PriceField";
import AlertTypeField from "../inputFields/AlertTypeField";

export default function AlertAdd(props) {
  const alertTypeList = ["alert", "entry", "stop loss", "target"];

  const { id } = useParams();
  const navigate = useNavigate();
  const [currentAlert, setCurrentAlert] = useState({});
  const [alertList, setAlertList] = useState({});
  const [alertPrice, setAlertPrice] = useState("0.00");
  const [alertType, setAlertType] = useState(alertTypeList[0]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleSetAlertPrice = ({ value }) => {
    setAlertPrice(value);
  };

  const handleSetAlertType = (value) => {
    setAlertType(value);
  };

  const fetchAlerts = async () => {
    try {
      const allAlerts = await ls.get("trade-alerts");
      setAlertList(allAlerts);
      for (let i = 0; i < allAlerts.length; i++) {
        if (allAlerts[i].id == id) {
          setCurrentAlert(allAlerts[i]);
          break;
        }
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const updateCurrentAlert = () => {
    return {
      ...currentAlert,
      alerts: [
        ...currentAlert.alerts,
        {
          id: generateId(),
          alertPrice,
          alertType,
					alertStatus: "active",
        },
      ],
    };
  };

  const saveAlert = async (e) => {
    e.preventDefault();

    const updatedCurrentAlert = updateCurrentAlert();
    const data = alertList.map((x) => (x.id == updatedCurrentAlert.id ? updatedCurrentAlert : x));

    try {
      await ls.set("trade-alerts", data);
      navigate("/");
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="page-container">
      <header>
        <h3>Add Alert</h3>
      </header>
      <form className="form-wrapper" onSubmit={saveAlert}>
        <div>TICKER: {currentAlert.ticker}</div>
        <div>
          <PriceField handleSetAlertPrice={handleSetAlertPrice} alertPrice={alertPrice} />
          <AlertTypeField
            handleSetAlertType={handleSetAlertType}
            alertTypeList={alertTypeList}
            alertType={alertType}
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
    </div>
  );
}
