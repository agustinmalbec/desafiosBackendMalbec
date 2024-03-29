import winston from "winston";
import enviroment from "../config/enviroment.config.js";

const myCustomLevels = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5,
    },
    colors: {
        debug: 'white',
        http: 'blue',
        info: 'green',
        warning: 'yellow',
        error: 'red',
        fatal: 'red',
    }
};
winston.addColors(myCustomLevels.colors);

const logger = winston.createLogger({
    levels: myCustomLevels.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.simple(),
                winston.format.printf((info) => {
                    return `${info.level}: ${info.message}`;
                })
            )
        }),
        new winston.transports.File({ filename: 'errors.log', level: 'warning' }),
    ],
});

const productionLogger = winston.createLogger({
    levels: myCustomLevels.levels,
    transports: [
        new winston.transports.File({ filename: 'errors.log', level: 'info' }),
    ],
});

export const loggerMiddleware = (req, res, next) => {
    req.logger = logger;

    if (enviroment.NODE_ENV === 'production') {
        req.logger = productionLogger;
    }

    logger.info(`${req.method} - ${req.url} - [${req.ip}] - ${req.get('user-agent')} - ${new Date().toISOString()}`);
    next();
};