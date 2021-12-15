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

  updateCronJobs() {
    return http.get("api/update-cron-jobs/");
  }
}

export default new ControlsDataService();
