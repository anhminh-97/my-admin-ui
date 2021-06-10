import AxiosClient from "Api/AxiosClient.js";

const ProductApi = {
  getAll(params) {
    const url = "/products";
    return AxiosClient.get(url, { params });
  },
  get(id) {
    const url = `/products/${id}`;
    return AxiosClient.get(url);
  },
  add(data) {
    const url = "/products";
    return AxiosClient.post(url, data);
  },
  update(data) {
    const url = `/products/${data.id}`;
    return AxiosClient.patch(url, data);
  },
  delete(id) {
    const url = `/products/${id}`;
    return AxiosClient.delete(url);
  },
  getPagination(params) {
    const url = `/products/${params}`;
    return AxiosClient.get(url, { params });
  },
  sortBy(params) {
    const url = `/products/${params}`;
    return AxiosClient.get(url, { params });
  },
};

export default ProductApi;
