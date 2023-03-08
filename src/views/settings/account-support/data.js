import {api} from "../../../services/api/api";
import {endpoints} from "../../../services/api/endpoints";

export const getTicketMessages = (ticketID) => {
    return api.get(endpoints.TICKET_MESSAGES(ticketID)).then(res => res.data);
}

export const openNewTicket = (body) => {
    return api.post(endpoints.OPEN_TICKET, body)
}

export const getTickets = (page) => {
    return api.get(endpoints.TICKET, {
        params: {
            page,
            size: 10
        }
    }).then(res => res.data);
}

export const closeTicket = (ticketID) => {
    return api.put(endpoints.CLOSE_TICKET(ticketID))
}

export const sendNewMessage = (body) => {
    return api.post(endpoints.SEND_NEW_MESSAGE, body)
}