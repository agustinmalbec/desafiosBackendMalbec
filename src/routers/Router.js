import { Router } from "express";
import jwt from "jsonwebtoken";

export default class Router {
    constructor() {
        this.Router = Router();
        this.init();
    }

    init() { }

    getRouter() {
        return this.Router;
    }

    get(path, polices, callback) {
        this.Router.get(path, this.handlerPolices(polices), this.applyCallback(callback));
    }

    post(path, polices, callback) {
        this.Router.post(path, this.handlerPolices(polices), this.applyCallback(callback));
    }

    put(path, polices, callback) {
        this.Router.put(path, this.handlerPolices(polices), this.applyCallback(callback));
    }

    delete(path, polices, callback) {
        this.Router.delete(path, this.handlerPolices(polices), this.applyCallback(callback));
    }

    applyCallback(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                params[1].sendStatus(500).send({ status: 'Internal server error', error });
            }
        });
    }

    handlerPolices = (polices) => (req, res, next) => {
        if (polices[0] == 'PUBLIC') {
            return next();
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.sendStatus(401).send({ status: 'Auth error', error: 'Unauthorized' });
        }

        const user = jwt.verify(token, 'secret');
        if (!polices.include(user.role.toUpperCase())) {
            return res.sendStatus(403).send({ status: 'Auth error', error: 'Forbidden' });
        }

        req.user = user;
        next();
    };

}