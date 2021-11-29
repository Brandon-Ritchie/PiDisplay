import React from "react";
import "./Entry.css";

export function Entry(props) {
  const { entry, removeEntry, updateEntry } = props;

  const handleRemoveClick = () => {
    removeEntry(entry.id);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    entry[name] = value;
    updateEntry(entry);
  };

  return (
    <div className="entry-container">
      <input
        className="input"
        defaultValue={entry.date || ""}
        name="date"
        type="date"
        onChange={handleChange}
      />
      <input
        className="input"
        defaultValue={entry.start_time || ""}
        name="start_time"
        type="time"
        onChange={handleChange}
      />
      <input
        className="input"
        defaultValue={entry.end_time || ""}
        name="end_time"
        type="time"
        onChange={handleChange}
      />
      <input
        className="input"
        defaultValue={entry.link || ""}
        name="link"
        type="string"
        onChange={handleChange}
      />
      <button
        aria-label="Remove entry"
        className="remove-button"
        onClick={handleRemoveClick}
        onChange={handleChange}
      >
        &times;
      </button>
    </div>
  );
}
