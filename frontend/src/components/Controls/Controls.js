import React from "react";
import "./Controls.css";
import ControlsDataService from "../../services/controls.service";

export function Controls() {
  const shutdown = () => {
    ControlsDataService.shutdown();
  };

  const reboot = () => {
    ControlsDataService.reboot();
  };

  const turnOnDisplay = () => {
    ControlsDataService.turnOnDisplay();
  };

  const turnOffDisplay = () => {
    ControlsDataService.turnOffDisplay();
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
