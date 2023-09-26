import userService from "../repositories/user.repository.js";
import CustomErrors from "../utils/customError.js";

class UserController {
    constructor() {
        this.controller = userService;
    }

    async getUsers() {
        try {
            return await this.controller.getUsers();
        } catch (err) {
            CustomErrors.createError('No se pudieron obtener los usuarios', generateErrorProduct({ err }), 'User error', ErrorCodes.PRODUCT_ERROR);
        }
    }

    async getUserByEmail(email) {
        try {
            return await this.controller.getUserByEmail(email);
        } catch (err) {
            CustomErrors.createError('No se pudo obtener el usuario por email', generateErrorProduct({ err }), 'User error', ErrorCodes.PRODUCT_ERROR);
        }
    }

    async getUserByCart(cart) {
        try {
            return await this.controller.getUserByCart(cart);
        } catch (err) {
            CustomErrors.createError('No se pudo obtener el usuario por el carrito', generateErrorProduct({ err }), 'User error', ErrorCodes.PRODUCT_ERROR);
        }
    }

    async getUserById(id) {
        try {
            return await this.controller.getUserById(id);
        } catch (err) {
            CustomErrors.createError('No se pudo obtener el usuario por id', generateErrorProduct({ err }), 'User error', ErrorCodes.PRODUCT_ERROR);
        }
    }

    async createUser(user) {
        try {
            return await this.controller.createUser(user);
        } catch (err) {
            CustomErrors.createError('No se pudo crear el usuario', generateErrorProduct({ err }), 'User error', ErrorCodes.PRODUCT_ERROR);
        }
    }
}

const userController = new UserController();
export default userController;