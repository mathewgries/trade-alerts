import React from "react";
import { Link } from "react-router-dom";

export default function Alert(props) {
  const { id, ticker, note, alerts, lastPrice } = props.data;
  const { deleteAlert, deleteSubAlert } = props;

  const handleDeleteAlert = () => {
    deleteAlert(id);
  };

  const handleDeleteSubAlert = (subId) => {
    deleteSubAlert(id, subId);
  };

  return (
    <div className="alert-wrapper">
      <div>
        <div>
          <div>Ticker: {ticker}</div>
          <div>Last: {lastPrice}</div>
        </div>

        <div>
          <div>Note: {note}</div>
        </div>
        <div className="btn-group-wrapper">
          <div>
            <Link to={`/alert-add/${id}`} className="btn btn-primary">
              Add
            </Link>
          </div>
          <div>
            <Link to={`/alert-details/edit/${id}`} className="btn btn-success">
              Edit
            </Link>
          </div>
          <div>
            <button className="btn btn-danger" onClick={handleDeleteAlert}>
              Delete
            </button>
          </div>
        </div>
      </div>
      <div>
        {alerts.map((x) => (
          <div key={x.id}>
            <div>Price: {x.alertPrice}</div>
            <div>Type: {x.alertType}</div>
						<div>Status: {x.alertStatus}</div>
            <div className="btn-group-wrapper">
              <div>
                <Link to={`/alert-edit/${x.id}`} className="btn btn-success">
                  Edit
                </Link>
              </div>
              <div>
                <button className="btn btn-danger" onClick={() => handleDeleteSubAlert(x.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
