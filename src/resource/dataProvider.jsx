import axiosInstance from "../services/api";

const bookFormData = (params) => {
  const formData = new FormData();
  params.data.fileBook?.rawFile &&
    formData.append("fileBook", params.data.fileBook.rawFile);
  params.data.fileCoverImage?.rawFile &&
    formData.append("fileCoverImage", params.data.fileCoverImage.rawFile);
  params.data.title && formData.append("title", params.data.title);
  params.data.description &&
    formData.append("description", params.data.description);
  params.data.totalPage && formData.append("totalPage", params.data.totalPage);
  params.data.publishedYear &&
    formData.append("publishedYear", params.data.publishedYear);
  params.data.tagIds && formData.append("tagIds", params.data.tagIds);

  return formData;
};

const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const body = {
      pagination: {
        page: page,
        pageSize: perPage,
      },
      orderBy: { field, order },
      filter: params.filter,
    };
    const url = `/${resource}/filter`;
    const response = await axiosInstance.post(url, body);
    return {
      data: response.data,
      total: response.pagination.total ? response.pagination.total : 0,
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
    if (resource === "books") {
      const formData = bookFormData(params);
      const response = await axiosInstance.post(`/${resource}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { data: response.data };
    }
    const response = await axiosInstance.post(`/${resource}`, params.data);
    return { data: response.data };
  },

  update: async (resource, params) => {
    if (resource === "books") {
      const formData = bookFormData(params);
      const response = await axiosInstance.put(
        `/${resource}/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return { data: response.data };
    }
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
