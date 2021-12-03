import React from "react";
import "./Test.css";

export function Test() {
  const shutdown = () => {
    fetch("http://localhost:8000/api/shutdown/");
  };

  const reboot = () => {
    fetch("http://localhost:8000/api/reboot/");
  };

  const turnOnDisplay = () => {
    fetch("http://localhost:8000/api/turn-on-display/");
  };

  const turnOffDisplay = () => {
    fetch("http://localhost:8000/api/turn-off-display/");
  };

  return (
    <div className="test-container">
      <div className="test-buttons-container">
        <button onClick={shutdown}>Shutdown</button>
        <button onClick={reboot}>Reboot</button>
        <button onClick={turnOnDisplay}>Turn On Display</button>
        <button onClick={turnOffDisplay}>Turn Off Display</button>
      </div>
      {/* <form className="link-test-container" onSubmit={handleSubmit}>
        <label htmlFor="link" className="test-link-label">
          Test Link:{" "}
        </label>
        <input type="text" name="link" defaultValue="" />
        <input type="submit" value="Test Link" />
      </form> */}
    </div>
  );
}
