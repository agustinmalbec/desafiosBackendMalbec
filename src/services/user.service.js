import userDAO from "../daos/user.dao.js";

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
        return this.service.createUser(user);
    }
}

const userService = new UserService();
export default userService;