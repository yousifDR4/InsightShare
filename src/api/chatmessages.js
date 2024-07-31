import configaxios from "./axiosconfig";
import headers from "./headers";
function chatmessages(groupsIDs, conversationsIDS) {
  console.log(conversationsIDS, "mmmmmmmmmmmmmmmmmmmmmm");
  console.log(groupsIDs);
  return configaxios
    .get(`http://127.0.0.1:8000/api/groups/conversations/messages`, {
      headers: headers,
      params: {
        conversation_ids: conversationsIDS,
        groups_ids: groupsIDs,
      },
    })
    .then((res) => {
      if (res.status === 200) return res.data;
      else return null;
    })
    .catch((e) => "error");
}
export default chatmessages;
