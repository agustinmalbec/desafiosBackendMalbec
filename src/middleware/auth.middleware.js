export function isAuth(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

export function isGuest(req, res, next) {
    if (!req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

export function isAdmin(req, res, next) {
    if (req.user.role === ' admin') {
        next();
    } else {
        alert('No posee permisos de administrador');
        res.redirect('/')
    }
}