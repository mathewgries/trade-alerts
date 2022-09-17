import React from "react";

export default function NoteField(props) {
  const { note, handleSetNote } = props;

  const handleOnChange = (e) => {
    const { value } = e.target;
    handleSetNote(value);
  };

  return (
    <div className="form-group">
      <label>Trade Notes</label>
      <textarea
        className="form-control"
        rows="4"
        cols="50"
        name="note"
        value={note}
        onChange={handleOnChange}
      />
    </div>
  );
}
