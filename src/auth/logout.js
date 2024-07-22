import axios from "axios";
axios.defaults.withCredentials=true;
axios.defaults.withXSRFToken=true;
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const csrfToken = getCookie('XSRF-TOKEN');
const decoded = decodeURIComponent(csrfToken);
 const logout=async()=>{
    try{
        console.log(decoded);
const res=await axios.post("http://localhost:8000/logout",  {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-XSRF-TOKEN": decoded
    },
    withCredentials: true
});
console.log(res);
if (res.status===200)
console.log(res.data);
  return res.data;
    }
    catch(e){
        console.log(e);
        return 401
    }
}
export default logout;