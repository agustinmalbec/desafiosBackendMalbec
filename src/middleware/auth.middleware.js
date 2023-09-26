export function isAuth(req, res, next) {
    if (req.user) {
        next();
    } else {
        req.logger.warn(`${req.user.rol} no autorizado`);
        res.redirect('/login');
    }
}

export function isGuest(req, res, next) {
    if (!req.user) {
        next();
    } else {
        req.logger.warn(`${req.user.rol} no autorizado`);
        res.redirect('/');
    }
}

export function isAdmin(req, res, next) {
    if (req.user.role === 'admin') {
        next();
    } else {
        req.logger.warn(`${req.user.rol} no autorizado`);
        res.redirect('/')
    }
}

export function isUser(req, res, next) {
    if (req.user.role === 'user') {
        next();
    } else {
        req.logger.warn(`${req.user.rol} no autorizado`);
        res.redirect('/')
    }
}