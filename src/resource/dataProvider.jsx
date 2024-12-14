import axiosInstance from "../services/api";

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
    const url = `/${resource}/filter`;
    const response = await axiosInstance.post(url, body);
    return {
      data: response.data.data,
      total: response.data.total,
    };
  },

  getOne: async (resource, params) => {
    const url = `/${resource}/${params.id}`;
    const response = await axiosInstance.get(url);
    return {
      data: response.data.data,
    };
  },

  create: async (resource, params) => {
    const response = await axiosInstance.post(`/${resource}`, params.data);
    return { data: response.data };
  },

  update: async (resource, params) => {
    const url = `/${resource}/${params.id}`;
    const response = await axiosInstance.put(url, params.data);
    return { data: response.data };
  },

  delete: async (resource, params) => {
    const url = `/${resource}/${params.id}`;
    const response = await axiosInstance.delete(url);
    return { data: response.data };
  },
};

export default dataProvider;
