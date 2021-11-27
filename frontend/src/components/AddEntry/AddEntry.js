import React, { useState } from "react";
import "./AddEntry.css";

export function AddEntry(props) {
  const [entry, setEntry] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addEntry(entry);
    setEntry({
      date: "",
      start_time: "",
      end_time: "",
      link: "",
    });
  };

  return (
    <form className="add-entry-container" onSubmit={handleSubmit}>
      <input
        value={entry.date || ""}
        name="date"
        type="date"
        onChange={handleChange}
      />
      <input
        value={entry.start_time || ""}
        name="start_time"
        type="time"
        onChange={handleChange}
      />
      <input
        value={entry.end_time || ""}
        name="end_time"
        type="time"
        onChange={handleChange}
      />
      <input
        value={entry.link || ""}
        name="link"
        type="text"
        onChange={handleChange}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
