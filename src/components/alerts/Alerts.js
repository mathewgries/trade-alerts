import React, { useState, useEffect } from "react";
import ls from "local-storage";
import { getPriceQuotes } from "../../api/tdaApi";
import { Link } from "react-router-dom";
import Alert from "./Alert";

export default function Alerts(props) {
  const [alerts, setAlerts] = useState([]);
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  // useEffect(() => {
  //   if (alerts.length > 0) {
  //     const interval = setInterval(async () => {
  //       const data = await getPriceQuotes(tickers);
  //       handleSetLastPrice(data);
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // });

  const loadAlerts = async () => {
    try {
      const data = await ls.get("trade-alerts");
      if (data) {
        setAlerts(data.map((x) => ({ ...x, lastPrice: "0.00" })));
        const tickerData = data.map((x) => ({ id: x.id, ticker: x.ticker }));
        setTickers(tickerData);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleSetLastPrice = (data) => {
    const withLastPrice = alerts.map((alert) => {
      const lastPrice = data[alert.ticker].lastPrice;
      return {
        ...alert,
        lastPrice,
      };
    });
    setAlerts(withLastPrice);
  };

  const deleteAllAlerts = async () => {
    try {
      await ls.remove("trade-alerts");
      setAlerts([]);
    } catch (e) {
      console.error(e.message);
    }
  };

  const deleteAlert = async function (id) {
    try {
      let newData = [];
      for (let i = 0; i < alerts.length; i++) {
        if (alerts[i].id != id) {
          newData.push(alerts[i]);
        }
      }
      if (newData.length > 0) {
        await ls.set("trade-alerts", newData);
        setAlerts(newData);
      } else {
        await ls.remove("trade-alerts");
        setAlerts([]);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const deleteSubAlert = async (id, subId) => {
    let alert;
    let subAlerts;
    for (let i = 0; i < alerts.length; i++) {
      if (alerts[i].id == id) {
        alert = alerts[i];
        subAlerts = alert.alerts;
        break;
      }
    }

    subAlerts = subAlerts.filter((x) => x.id != subId);
    const newData = alerts.map((x) => (x.id != id ? x : { ...alert, alerts: subAlerts }));

    try {
      await ls.set("trade-alerts", newData);
      setAlerts(newData);
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div>
      <div>
        <div>
          <header>
            <h3>Your Alerts</h3>
          </header>
        </div>

        <div className="btn-group-wrapper">
          <div>
            <Link to="/alert-new" className="btn btn-primary">
              Add
            </Link>
          </div>
          <div>
            <button className="btn btn-danger" onClick={deleteAllAlerts}>
              Delete All
            </button>
          </div>
        </div>

        {alerts.length > 0 ? (
          <div>
            {" "}
            {alerts.map((x) => (
              <div key={x.id}>
                <Alert data={x} deleteAlert={deleteAlert} deleteSubAlert={deleteSubAlert} />
              </div>
            ))}
          </div>
        ) : (
          <header>
            <h4>No Alerts Added</h4>
          </header>
        )}
      </div>
    </div>
  );
}
