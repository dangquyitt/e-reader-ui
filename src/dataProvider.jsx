import { fetchUtils } from "react-admin";

const API_URL = import.meta.env.VITE_API_URL;

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const accessToken = localStorage.getItem("accessToken");
  options.headers.set("Authorization", `Bearer ${accessToken}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const body = {
      pagination: {
        page: page,
        pageSize: perPage,
      },
      filter: params.filter,
    };
    const url = `${API_URL}/${resource}/filter`;
    return httpClient(url, {
      method: "POST",
      body: JSON.stringify(body),
    }).then(({ json }) => ({
      data: json.data,
      total: json.total,
    }));
  },

  getOne: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    return httpClient(url).then(({ json }) => ({
      data: json.data,
    }));
  },

  create: async (resource, params) => {
    const { json } = await httpClient(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  update: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  delete: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: "DELETE",
    });
    return { data: json };
  },
};

export default dataProvider;
