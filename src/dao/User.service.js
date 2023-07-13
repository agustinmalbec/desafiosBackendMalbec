import userModel from "../models/user.model.js";

class UserService {
    constructor() {
        this.model = userModel;
    }

    async getAll() {
        return await this.model.find();
    }

    async getUserByEmail(email) {
        return await this.model.findOne({ email: email });
    }

    async createUser(user) {
        return await this.model.create(user);
    }
}

const userService = new UserService();
export default userService;