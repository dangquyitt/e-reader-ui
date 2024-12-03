const authProvider = {
  async login({ username, password }) {
    const request = new Request(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    let response;
    try {
      response = await fetch(request);
    } catch (_error) {
      throw new Error("Network error");
    }
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }
    const { data } = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
  },
  async checkError(error) {
    // const status = error.status;
    // if (status === 401 || status === 403) {
    //   localStorage.removeItem("accessToken");
    //   throw new Error("Session expired");
    // }
  },
  async checkAuth() {
    if (!localStorage.getItem("accessToken")) {
      throw new Error("Not authenticated");
    }
  },
  async logout() {
    localStorage.removeItem("accessToken");
  },
};

export default authProvider;
