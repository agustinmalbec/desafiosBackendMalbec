import errorCodes from "../utils/error.js";

export default (err, req, res, next) => {
    req.logger.warning(err, 'Me permite hacer seguimiento de los errores que debo capturar')
    switch (err.code) {

        case errorCodes.INVALID_TYPE:
            res.render('dataerror')
            break;
        case errorCodes.ROUTING_ERROR:
            res.render('dataerror')
            break;
        case errorCodes.DESLOGUEO_ERROR:
            res.render('dataerror')
            break;
        case errorCodes.AUTENTICACION_ERROR:
            res.render('errorautorizacion')
            break;
        case errorCodes.ADMIN_NOAUTHORIZATION:
            res.render('errorautorizacion')
            break;
        case errorCodes.PRODUCT_ERROR:
            res.status(400)
            break;
        case errorCodes.CART_ERROR:
            res.status(400)
            break;
        case errorCodes.TICKET_ERROR:
            res.status(400)
            break;
        case errorCodes.FILE_ERROR:
            res.render('faltadearchivos')
            break;
        default:
            res.render('errorservidor');
            break;
    }
};