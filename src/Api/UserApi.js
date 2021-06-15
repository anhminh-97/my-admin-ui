import AuthClient from "./AuthClient";

const UserApi = {
  register(data) {
    const url = "/auth/register";
    return AuthClient.post(url, data);
  },

  login(data) {
    const url = "/auth/login";
    return AuthClient.post(url, data);
  },
};

export default UserApi;
