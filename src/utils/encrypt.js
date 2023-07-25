import bcrypt from 'bcrypt';

export const encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const comparePassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};
