import HttpService from "./http-service";
class UserService extends HttpService {
  async getAllUser(page) {
    try {
      const response = await this.get(`/users`, {
        params: {
          page: page,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async addUser({ fullName, email, birthday, phone, address,gender,avatar ,coin,roleId }) {
    try {
      const response = await this.post(`/users`, {
        body: {
            fullName,
            email,
            birthday,
            phone,
            address,
            gender,
            avatar,
            coin,
          roleId,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async changeUser(
    payload,
    { id, fullName, birthday, phone, address, gender }
  ) {
    try {
      const response = await this.patch(`/users/${payload}`, {
        body: {
          id,
          fullName,
          birthday,
          phone,
          address,
          gender,

        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async deleteUser(payload) {
    try {
      const response = await this.delete(`/users/${payload}`);

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getUserInfo(payload) {
    try {
      const response = await this.get(`/users/${payload}`);

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async changePassword({newPassword, oldPassword}) {
    try {
      const response = await this.patch(`users/changePassword`, {
        body: {
          newPassword,
          oldPassword
        }
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async register({username, password, phoneNumber,fullName,email}) {
    try {
      const response = await this.post(`users`, {
        body: {
          username,
          password,
          phoneNumber,
          fullName,
          email
        }
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new UserService();
