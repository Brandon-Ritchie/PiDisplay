import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export default axios.create({
  baseUrl: `${window.location.href}/`,
  headers: {
    "Content-type": "application/json",
  },
});
