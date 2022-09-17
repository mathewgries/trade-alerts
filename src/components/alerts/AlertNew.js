import React, { useState } from "react";
import ls from "local-storage";
import { useNavigate } from "react-router-dom";
import { generateId } from "../../helpers";
import { Link } from "react-router-dom";
import TickerField from "../inputFields/TickerField";
import PriceField from "../inputFields/PriceField";
import NoteField from "../inputFields/NoteField";
import AlertTypeField from "../inputFields/AlertTypeField";

export default function AlertNew() {
  const alertTypeList = ["alert", "entry", "stop loss", "target"];
  const navigate = useNavigate();
  const [ticker, setTicker] = useState("");
  const [note, setNote] = useState("");
  const [alertPrice, setAlertPrice] = useState("0.00");
  const [alertType, setAlertType] = useState(alertTypeList[0]);

  const handleSetTicker = (value) => {
    setTicker(value);
  };

  const handleSetNote = (value) => {
    setNote(value);
  };

  const handleSetAlertPrice = ({ value }) => {
    setAlertPrice(value);
  };

  const handleSetAlertType = (value) => {
    setAlertType(value);
  };

  const fetchAlerts = async () => {
    try {
      return await ls.get("trade-alerts");
    } catch (e) {
      alert("NO HOMIE");
    }
  };

  const saveAlert = async (e) => {
    e.preventDefault();

    const existingAlerts = (await fetchAlerts()) || [];
    const data = [
      ...existingAlerts,
      {
        id: generateId(),
        ticker: ticker.toUpperCase(),
        note,
        alerts: [
          {
            id: generateId(),
            alertPrice: alertPrice,
            alertType,
            alertStatus: "active",
          },
        ],
      },
    ];

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
      <form className="form-wrapper" onSubmit={saveAlert}>
        <div>
          <TickerField handleSetTicker={handleSetTicker} ticker={ticker} />
          <NoteField note={note} handleSetNote={handleSetNote} />
          <PriceField handleSetAlertPrice={handleSetAlertPrice} alertPrice={alertPrice} />
          <AlertTypeField
            handleSetAlertType={handleSetAlertType}
            alertTypeList={alertTypeList}
            alertType={alertType}
          />
        </div>
        <div className="btn-group-wrapper">
          <div>
            <button className="btn btn-primary" disabled={ticker === "" || alertPrice === "0.00"}>
              save
            </button>
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
