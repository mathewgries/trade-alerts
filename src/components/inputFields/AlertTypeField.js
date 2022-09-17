import React from "react";

export default function AlertTypeField(props) {
  const { handleSetAlertType, alertTypeList, alertType } = props;

  const handleOnChange = (e) => {
    const { value } = e.target;
    handleSetAlertType(value);
  };

  return (
    <div className="form-group">
      <label>Alert Type</label>
      {alertTypeList.map((x) => (
        <div key={x} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="selectedAlert"
            id={x}
            value={x}
            checked={alertType === x}
            onChange={handleOnChange}
          />
          <label className="form-check-label" htmlFor={x}>
            {x}
          </label>
        </div>
      ))}
    </div>
  );
}
