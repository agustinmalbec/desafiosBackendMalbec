import userDAO from "../daos/user.dao.js";
import UserDTO from "../dtos/user.dto.js";

class UserService {
    constructor() {
        this.service = userDAO;
    }

    getUsers() {
        return this.service.getUsers();
    }

    getUserByEmail(email) {
        return this.service.getUserByEmail(email);
    }

    getUserById(id) {
        return this.service.getUserById(id);
    }

    createUser(user) {
        const newUser = new UserDTO(user);
        return this.service.createUser(newUser);
    }
}

const userService = new UserService();
export default userService;