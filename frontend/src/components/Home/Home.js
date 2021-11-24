import "./Home.css";
import React, { useState, useEffect } from "react";
import { Entry } from "../Entry/Entry";

export function Home() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("api/job/");
      const jsonResponse = await response.json();
      setEntries(jsonResponse);
    }
    fetchData();
  }, []);

  const removeEntry = (entryIdToRemove) => {
    setEntries((entries) =>
      entries.filter((entry) => entry.id !== entryIdToRemove)
    );
  };

  return (
    <div>
      <h1>Schedule</h1>
      <form>
        <ul>
          <div className="header-row">
            <p>Date</p>
            <p>Start Time</p>
            <p>End Time</p>
            <p>Link</p>
            <p></p>
          </div>
          <ul className="entries">
            {entries.map((entry) => (
              <Entry key={entry.id} entry={entry} removeEntry={removeEntry} />
            ))}
          </ul>
        </ul>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
