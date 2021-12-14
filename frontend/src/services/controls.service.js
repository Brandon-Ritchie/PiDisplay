import http from "../http-common";

class ControlsDataService {
  shutdown() {
    return http.get("api/shutdown/");
  }

  reboot() {
    return http.get("api/reboot/");
  }

  turnOnDisplay() {
    return http.get("api/turn-on-display/");
  }

  turnOffDisplay() {
    return http.get("api/turn-off-display/");
  }
}

export default new ControlsDataService();
