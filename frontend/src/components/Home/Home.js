import "./Home.css";
import React, { useState, useEffect } from "react";
import { Entry } from "../Entry/Entry";
import JobDataService from "../../services/job.service";
import { AddEntry } from "../AddEntry/AddEntry";

export function Home() {
  const [entries, setEntries] = useState([]);

  async function fetchData() {
    const response = await JobDataService.getAll();
    setEntries(response.data);
  }

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
    }

    try {
      addToDatabase(entryToAdd);

      setEntries((prev) => {
        return [...prev, entryToAdd];
      });
    } catch (error) {
      alert(error);
    }

    fetchData();
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
      <form>
        <ul className="entries">
          {entries.map((entry) => (
            <Entry key={entry.id} entry={entry} removeEntry={removeEntry} />
          ))}
        </ul>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
