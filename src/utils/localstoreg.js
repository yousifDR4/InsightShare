const USER_KEY = "user_info";
export const getUserInfo = () => {
  const userInfo = localStorage.getItem(USER_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
};

export const setUserInfo = (userInfo) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
};

export const clearUserInfo = () => {
  localStorage.removeItem(USER_KEY);
};
