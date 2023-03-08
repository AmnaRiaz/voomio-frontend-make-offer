import { useEffect, useState } from "react";
import { useChatSocket } from "../ChatProvider";

export const useRoomChat = (roomId) => {
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const socket = useChatSocket();

    useEffect(() => {
        if (!socket) return;

        socket.emit('join-room', {
            room: roomId
        });

        const handleJoinRes = (e) => {
            if (e.room !== roomId) return;

            socket.emit('get-messages', {
                room: roomId
            })

            socket.emit('get-onlines', {
                room: roomId
            })
        }

        const handleGetPreviousMessages = (data) => {
            if (data.room !== roomId) return;

            setMessages(data.messages)
        }

        const handleGetOnlineUsers = (data) => {
            if (data.room !== roomId) return;

            setOnlineUsers(data.users)
        }

        const handleAddOnlineUser = (data) => {
            if (data.room !== roomId) return;

            console.log('added online user', data)
            setOnlineUsers(p => ([...p, data.user]))
        }

        const handleDeleteOnlineUser = (data) => {
            if (data.room !== roomId) return;

            setOnlineUsers(p => p.filter(user => user._id !== data.user._id));
        }

        const handleGetNewMessages = (data) => {
            if (data.room !== roomId) return;

            setMessages(p => ([...p, data.message]))
        }

        const handleUpdateEditedMessage = (data) => {
            if (data.room !== roomId) return;

            setMessages(p => p.map(msg => {
                if (msg.id !== data.message.id) return msg;

                return data.message;
            }))
        }

        const handleDeleteMessage = (data) => {
            if (data.room !== roomId) return;

            setMessages(p => p.filter(msg => msg.id !== data.id))
        }

        socket.on('join-room-resp', handleJoinRes);
        socket.on('get-messages-resp', handleGetPreviousMessages);
        socket.on('get-onlines-resp', handleGetOnlineUsers);
        socket.on('user-online', handleAddOnlineUser);
        socket.on('user-offline', handleDeleteOnlineUser);
        socket.on('message', handleGetNewMessages);
        socket.on('edit-message', handleUpdateEditedMessage);
        socket.on('delete-message', handleDeleteMessage);

        return () => {
            socket.emit('leave-room', {
                room: roomId
            })

            socket.off('join-room-resp', handleJoinRes);
            socket.off('get-messages-resp', handleGetPreviousMessages);
            socket.off('get-onlines-resp', handleGetOnlineUsers);
            socket.off('user-online', handleAddOnlineUser);
            socket.off('user-offline', handleDeleteOnlineUser);
            socket.off('message', handleGetNewMessages);
            socket.off('edit-message', handleUpdateEditedMessage);
            socket.off('delete-message', handleDeleteMessage);
        };
    }, []);

    return {
        messages,
        onlineUsers
    }
}