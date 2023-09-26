import ticketService from "../repositories/ticket.repository.js";
import CustomErrors from "../utils/customError.js";

class TicketController {
    constructor() {
        this.controller = ticketService;
    }

    async addTicket(ticket) {
        try {
            return await this.controller.addTicket(ticket);
        } catch (err) {
            CustomErrors.createError('No se pudo agregar el ticket', generateErrorProduct({ err }), 'Ticket error', ErrorCodes.PRODUCT_ERROR);
        }
    }

    async getTickets() {
        try {
            return await this.controller.getTickets();
        } catch (err) {
            CustomErrors.createError('No se pudo obtener los tickets', generateErrorProduct({ err }), 'Ticket error', ErrorCodes.PRODUCT_ERROR);
        }
    }

    async getSinleTicket(id) {
        try {
            return await this.controller.getSinleTicket(id);
        } catch (err) {
            CustomErrors.createError('No se pudo obtener el ticket', generateErrorProduct({ err }), 'Ticket error', ErrorCodes.PRODUCT_ERROR);
        }
    }

    async deleteTicket(id) {
        try {
            return await this.controller.deleteTicket(id);
        } catch (err) {
            CustomErrors.createError('No se pudo eliminar el ticke', generateErrorProduct({ err }), 'Ticket error', ErrorCodes.PRODUCT_ERROR);
        }
    }
}

const ticketController = new TicketController();
export default ticketController;