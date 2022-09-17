import React from "react";
import CurrencyInput from "../inputFields/CurrencyInput";

export default function PriceField(props) {
  const { handleSetAlertPrice, alertPrice } = props;

  const handleOnChange = (e) => {
    handleSetAlertPrice(e);
  };
  return (
    <div className="form-group">
      <div>
        <CurrencyInput
          inputName={"alertPrice"}
          inputLabel={"Alert Price"}
          inputValue={alertPrice}
          inputChangeHandler={handleOnChange}
        />
      </div>
    </div>
  );
}
