import AuthClient from "./AuthClient";

const UserApi = {
  register(data) {
    const url = "/auth/local/register";
    return AuthClient.post(url, data);
  },

  login(data) {
    const url = "/auth/local";
    return AuthClient.post(url, data);
  },
};

export default UserApi;
