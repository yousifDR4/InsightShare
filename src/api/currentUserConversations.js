import decoded from "./../auth/XSRF_token";
import configaxios from "./axiosconfig";

const currentUserConversations = (id) => {
  return configaxios
    .get(`http://localhost:8000/api/conversations/messages/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": decoded,
      },
    })
    .then((res) => {
      console.log(res.data, "data");
      return res.data;
    })
    .catch((e) => {
      return new Error(e);
    });
};
export default currentUserConversations;
