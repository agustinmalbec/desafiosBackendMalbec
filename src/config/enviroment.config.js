import dotenv from 'dotenv';
import program from './comander.config.js';

let path = '.env.dev';

if (program.opts().mode == 'prod') {
    path = '.env.prod';
}

dotenv.config({ path });

export default {
    PORT: process.env.PORT,
    DB_LINK: process.env.DB_LINK,
    SECRET_KEY: process.env.SECRET_KEY,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    KEY: process.env.KEY,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
};