import ticketDAO from "../daos/ticket.dao.js";
import TicketDTO from "../dtos/ticket.dto.js";

class TicketService {
    constructor() {
        this.service = ticketDAO;
    }

    async addTicket(ticket) {
        const newTicket = new TicketDTO(ticket);
        return await this.service.addTicket(newTicket);
    }

    async getTickets() {
        return await this.service.getTickets();
    }

    async getSinleTicket(id) {
        return await this.service.getSinleTicket(id);
    }

    async deleteTicket(id) {
        return await this.service.deleteTicket(id);
    }

}

const ticketService = new TicketService();
export default ticketService;