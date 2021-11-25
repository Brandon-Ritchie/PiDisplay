import React from "react";
import "./Entry.css";

export function Entry(props) {
  const { entry, removeEntry } = props;

  const handleRemoveClick = () => {
    removeEntry(entry.id);
  };

  return (
    <li className="entry">
      <input type="date" value={entry.date} />
      <input type="time" value={entry.start_time} />
      <input type="time" value={entry.end_time} />
      <input type="string" value={entry.link} />
      <button
        aria-label="Remove entry"
        className="remove-button"
        onClick={handleRemoveClick}
      >
        &times;
      </button>
    </li>
  );
}
