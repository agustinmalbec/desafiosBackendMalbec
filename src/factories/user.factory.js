import UserDTO from "../dtos/user.dto.js";

export default class UserFactory {
    constructor(dao) {
        this.dao = dao;
    }

    getUsers() {
        return this.dao.getUsers();
    }

    getUserByEmail(email) {
        return this.dao.getUserByEmail(email);
    }

    getUserById(id) {
        return this.dao.getUserById(id);
    }

    createUser(user) {
        const newUser = new UserDTO(user);
        return this.dao.createUser(newUser);
    }
}