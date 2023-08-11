import dotenv from 'dotenv';
import program from './comander.config.js';

let path = '.env.dev';

if (program.opts().mode == 'prod') {
    path = '.env.prod';
}

dotenv.config({ path });

export default { PORT: process.env.PORT };