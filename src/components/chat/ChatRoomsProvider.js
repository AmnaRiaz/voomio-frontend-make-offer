import {createContext, useEffect, useReducer} from "react";
import {useChatSocket} from "./ChatProvider";

const ChatRoomsContext = createContext();

const roomsReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ROOM": {

        }
    }
}

const ChatRoomsProvider = ({children}) => {
    const [rooms, dispatch] = useReducer(roomsReducer, {});

    const socket = useChatSocket();

    useEffect(() => {
        if (!socket) return;

        const handleJoinRes = (e) => {
            console.log('join-room-res', e);
            socket.emit('get-messages', {
                room: e.roomId
            })

            socket.emit('get-onlines', {
                room: e.roomId
            })
        }

        const handleGetPreviousMessages = (prevMessages) => {
            console.log('prev messages', prevMessages);
            setMessages(prevMessages)
        }

        const handleGetOnlineUsers = (onlineUsers) => {
            console.log('online users', onlineUsers);
            setOnlineUsers(onlineUsers)
        }

        const handleAddOnlineUser = (newOnlineUser) => {
            console.log('added online user', newOnlineUser)
            setOnlineUsers(p => ([...p, newOnlineUser]))
        }

        const handleDeleteOnlineUser = (offlineUser) => {
            console.log('offline user', offlineUser)
            setOnlineUsers(p => p.filter(user => user._id !== offlineUser._id));
        }

        const handleGetNewMessages = (newMessage) => {
            console.log('new messages', newMessage);
            setMessages(p => ([...p, newMessage]))
        }

        const handleUpdateEditedMessage = (editedMessage) => {
            setMessages(p => p.map(msg => {
                if (msg.id !== editedMessage.id) return msg;

                return editedMessage;
            }))
        }

        const handleDeleteMessage = (deletedMessage) => {
            setMessages(p => p.filter(msg => msg.id !== deletedMessage.id))
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

    return (
        <ChatRoomsContext.Provider value={rooms}>
            {children}
        </ChatRoomsContext.Provider>
    );
};

export default ChatRoomsProvider;