import axiosInstance from "../services/api";

const accessControlStrategies = {
  ADMIN: ({ resource, action }) => {
    return true;
  },
  USER: ({ resource, action }) => {
    return resource !== "books";
  },
};

const authProvider = {
  async login({ email, password }) {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      const jwtPayload = JSON.parse(
        window.atob(response.data.accessToken.split(".")[1])
      );
      localStorage.setItem("roles", jwtPayload.roles || []);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  async checkError(error) {
    // const status = error.status;
    // if (status === 401 || status === 403) {
    //   localStorage.removeItem("accessToken");
    //   throw new Error("Session expired");
    // }
  },
  async checkAuth() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Not authenticated");
    }
  },
  async logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("roles");
  },
  // async canAccess({ resource, action }) {
  //   const roles = JSON.parse(localStorage.getItem("roles"));
  //   console.log({ roles });

  //   return roles.some((role) => {
  //     console.log(role);

  //     return accessControlStrategies[role]({ resource, action });
  //   });
  // },
};

export default authProvider;
