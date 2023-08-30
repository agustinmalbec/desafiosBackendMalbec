import userService from "../repositories/user.repository.js";

class UserController {
    constructor() {
        this.controller = userService;
    }

    async getUsers() {
        try {
            return await this.controller.getUsers();
        } catch (error) {
            throw new Error('No se pudieron obtener los usuarios')
        }
    }

    async getUserByEmail(email) {
        try {
            return await this.controller.getUserByEmail(email);
        } catch (error) {
            throw new Error('No se pudo obtener el usuario por email')
        }
    }

    async getUserById(id) {
        try {
            return await this.controller.getUserById(id);
        } catch (error) {
            throw new Error('No se pudo obtener el usuario por id')
        }
    }

    async createUser(user) {
        try {
            return await this.controller.createUser(user);
        } catch (error) {
            throw new Error('No se pudo crear el usuario')
        }
    }
}

const userController = new UserController();
export default userController;