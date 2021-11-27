import "./Home.css";
import React, { useState, useEffect } from "react";
import { Entry } from "../Entry/Entry";
import JobDataService from "../../services/job.service";
import { AddEntry } from "../AddEntry/AddEntry";

export function Home() {
  const [entries, setEntries] = useState([]);

  const fetchData = async () => {
    const response = await JobDataService.getAll();
    setEntries(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeEntry = (entryIdToRemove) => {
    async function deleteFromDatabase(id) {
      await JobDataService.delete(id);
    }

    try {
      deleteFromDatabase(entryIdToRemove);

      setEntries((entries) =>
        entries.filter((entry) => entry.id !== entryIdToRemove)
      );
    } catch (error) {
      alert(error);
    }
  };

  const addEntry = (entryToAdd) => {
    async function addToDatabase(entry) {
      await JobDataService.create(entry);
      setEntries((prev) => {
        return [...prev, entryToAdd];
      });
      await fetchData();
    }

    try {
      addToDatabase(entryToAdd);
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < entries.length; i++) {
      JobDataService.update(entries[i].id, entries[i]);
    }
  };

  const updateEntry = (newEntry) => {
    const entryToChange = entries.filter(
      (entry) => entry.id === newEntry["id"]
    );
    const entryToChangeIndex = entryToChange["id"];
    entries[entryToChangeIndex] = newEntry;
  };

  return (
    <div>
      <h1>Schedule</h1>
      <div className="header-row">
        <p>Date</p>
        <p>Start Time</p>
        <p>End Time</p>
        <p>Link</p>
        <p></p>
      </div>
      <AddEntry addEntry={addEntry} />
      <form onSubmit={handleSubmit}>
        <ul className="entries">
          {entries.map((entry) => (
            <Entry
              key={entry.id}
              entry={entry}
              removeEntry={removeEntry}
              updateEntry={updateEntry}
            />
          ))}
        </ul>
        <input type="reset" value="Reset" />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
