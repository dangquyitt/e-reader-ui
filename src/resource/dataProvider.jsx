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
      data: response.data,
      total: response.pagination.total,
    };
  },

  getMany: async (resource, params) => {
    const { ids } = params;
    const body = {
      filter: {
        ids,
      },
      pagination: {
        page: 1,
        pageSize: 1000,
      },
    };
    const url = `/${resource}/filter`;
    const response = await axiosInstance.post(url, body);
    console.log(response);
    return {
      data: response.data,
    };
  },

  getOne: async (resource, params) => {
    const url = `/${resource}/${params.id}`;
    const response = await axiosInstance.get(url);
    return {
      data: response.data,
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
