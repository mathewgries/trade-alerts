import React from "react";

export default function TickerField(props) {
  const { handleSetTicker, ticker } = props;

  const handleOnChange = (e) => {
    const { value } = e.target;
    handleSetTicker(value.trim());
  };

  return (
    <div className="form-group">
      <label>Ticker</label>
      <input className="form-control" type="text" value={ticker} onChange={handleOnChange} />
    </div>
  );
}
