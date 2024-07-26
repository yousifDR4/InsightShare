import headers from "../headers";
import configaxios from "../axiosconfig";
function groupmesages(id, pagenumber) {
  return configaxios
    .get(
      `http://127.0.0.1:8000/api/groups/${id}/messages?pagenumber=${pagenumber}`,
      {
        headers: headers,
      }
    )
    .then((res) => {
      if (res.status === 200) return res.data;
      else return res.status;
    })
    .catch((e) => "error");
}
export default groupmesages;
