function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
const csrfToken = getCookie("XSRF-TOKEN");
const decoded = decodeURIComponent(csrfToken);
export default decoded;
