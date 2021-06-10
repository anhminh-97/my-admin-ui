import AxiosClient from "Api/AxiosClient.js";

const CategoryApi = {
  getAll(params) {
    const url = "/categories";
    return AxiosClient.get(url, { params });
  },
  get(id) {
    const url = `/categories/${id}`;
    return AxiosClient.get(url);
  },
  add(data) {
    const url = "/categories";
    return AxiosClient.post(url, data);
  },
  update(data) {
    const url = `/categories/${data.id}`;
    return AxiosClient.patch(url, data);
  },
  delete(id) {
    const url = `/categories/${id}`;
    return AxiosClient.delete(url);
  },
};

export default CategoryApi;
