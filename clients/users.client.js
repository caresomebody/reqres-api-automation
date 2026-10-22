export class UsersClient {
  constructor(api) {
    this.api = api;
  }

  async createUser(name, job) {
    return this.api.post("/api/users", {
      data: { name, job },
    });
  }

  async createUserWithPayload(payload) {
    return this.api.post("/api/users", {
      data: payload,
    });
  }

  async getUser(id) {
    return this.api.get(`/api/users/${id}`);
  }

  async getAllUsers(page = 1) {
    return this.api.get(`/api/users?page=${page}`);
  }

  async updateUser(id, name, job) {
    return this.api.put(`/api/users/${id}`, {
      data: { name, job },
    });
  }

  async updateUserWithPayload(id, payload) {
    return this.api.put(`/api/users/${id}`, {
      data: payload,
    });
  }
}
