import decoded from "../auth/XSRF_token";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-XSRF-TOKEN": decoded,
};
export default headers;
