import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
const csrfToken = getCookie("XSRF-TOKEN");
const decoded = decodeURIComponent(csrfToken);
const currentuser = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/auth/user", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": decoded,
      },
      withCredentials: true,
    });
    if (res.status === 200) {
      console.log(res.data);
      return res.data.data;
    }
  } catch (e) {
    return null;
  }
};
export default currentuser;
