import http from "../http-common";

class JobDataService {
  getAll() {
    return http.get("api/job/");
  }

  get(id) {
    return http.get(`api/job/${id}/`);
  }

  create(data) {
    return http.post("api/job/", data);
  }

  update(id, data) {
    return http.put(`api/job/${id}/`, data);
  }

  delete(id) {
    return http.delete(`api/job/${id}/`);
  }

  deleteAll() {
    return http.delete(`api/job/`);
  }
}

export default new JobDataService();
