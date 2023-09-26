import ticketModel from "../models/ticket.model.js";

class TicketDAO {
    constructor() {
        this.model = ticketModel;
    }

    async addTicket(ticket) {
        return await this.model.create(ticket);
    }

    async getTickets() {
        return await this.model.find();
    }

    async getSinleTicket(id) {
        return await this.model.findOne({ _id: id }).lean();
    }

    async deleteTicket(id) {
        return await this.model.findByIdAndDelete({ _id: id });
    }
}

const ticketDAO = new TicketDAO();
export default ticketDAO;