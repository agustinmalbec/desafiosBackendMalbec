import userModel from "../models/user.model.js";

class UserDAO {
    constructor() {
        this.model = userModel;
    }

    getUsers() {
        return this.model.find();
    }

    getUserByEmail(email) {
        return this.model.findOne({ email: email });
    }

    getUserById(id) {
        return this.model.findById(id);
    }

    createUser(user) {
        return this.model.create(user);
    }
}

const userDAO = new UserDAO();
export default userDAO;