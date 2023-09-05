import userDAO from "../daos/user.dao.js";
import UserDTO from "../dtos/user.dto.js";

class UserService {
    constructor() {
        this.service = userDAO;
    }

    async getUsers() {
        return await this.service.getUsers();
    }

    async getUserByEmail(email) {
        return await this.service.getUserByEmail(email);
    }

    async getUserById(id) {
        return await this.service.getUserById(id);
    }

    async createUser(user) {
        const newUser = new UserDTO(user);
        return await this.service.createUser(newUser);
    }
}

const userService = new UserService();
export default userService;