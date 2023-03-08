import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {queryKey} from "../../../utils/queryKey";
import {closeTicket, getTicketMessages, getTickets, openNewTicket, sendNewMessage} from "./data";
import {notification} from "../../../utils/utility";

export const useTicketData = (ticketID) => {
    return useQuery(
        [queryKey.TICKET, ticketID],
        () => getTicketMessages(ticketID)
    )
}

export const useOpenNewTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: openNewTicket,
        onSuccess: () => {
            queryClient.refetchQueries([queryKey.TICKETS])
        },
        onError: (error) => {
            notification(error.response?.data?.message, 'error')
        }
    })
}

export const useTickets = (page) => {
    return useQuery([queryKey.TICKETS, page], () => getTickets(page))
}

export const useCloseTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: closeTicket,
        onSuccess: () => {
            queryClient.refetchQueries([queryKey.TICKETS])
            notification('Ticket closed successfully', 'success')
        }
    })
}

export const useSendNewMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sendNewMessage,
        onSuccess: () => {
            queryClient.refetchQueries([queryKey.TICKET])
        },
        onError: (error) => {
            notification(error.response?.data?.message, 'error')
        }
    })
}