import http from "../http-common";

class ControlsDataService {
  shutdown() {
    return http.get("/shutdown/");
  }

  reboot() {
    return http.get("/reboot/");
  }

  turnOnDisplay() {
    return http.get("/turn-on-display/");
  }

  turnOffDisplay() {
    return http.get("/turn-off-display/");
  }
}

export default new ControlsDataService();
