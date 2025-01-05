import { LoginType } from "../constants/loginType";
import axiosInstance from "../services/api";

const accessControlStrategies = {
  ADMIN: ({ resource, action }) => {
    return true;
  },
  USER: ({ resource, action }) => {
    if (resource === "books" && (action === "list" || action === "show")) {
      return true;
    }

    if (resource === "collections") {
      return true;
    }

    if (resource === "subscriptions" && action === "list") {
      return true;
    }

    if (resource === "favorites") {
      return true;
    }

    if (resource === "comments") {
      return true;
    }

    return false;
  },
};

const authProvider = {
  async login({ loginType, idTokenString, email, password }) {
    try {
      const responseFunc = async () => {
        if (loginType === LoginType.GOOGLE) {
          return await axiosInstance.post("/auth/googleLogin", {
            idTokenString,
          });
        }
        return await axiosInstance.post("/auth/login", {
          email,
          password,
        });
      };
      const response = await responseFunc();
      localStorage.setItem("accessToken", response.data.accessToken);
      const jwtPayload = JSON.parse(
        window.atob(response.data.accessToken.split(".")[1])
      );
      localStorage.setItem("roles", jwtPayload.roles || []);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
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
  async canAccess({ resource, action }) {
    const roles = localStorage.getItem("roles").split(",");
    return roles.some((role) => {
      return accessControlStrategies[role]({ resource, action });
    });
  },
};

export default authProvider;
