import configaxios from "../api/axiosconfig";
import decoded from "./XSRF_token";

const groupusers = async (id) => {
  try {
    const res = await configaxios.get(
      `http://localhost:8000/api/group/${id}/users`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decoded,
        },
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      console.log(res.data);
      return { [id]: res.data.data };
    }
  } catch (e) {
    return null;
  }
};
export default groupusers;
