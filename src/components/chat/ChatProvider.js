import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const ChatSocketContext = createContext();
const DirectsListContext = createContext();
const RoomsListContext = createContext()

export const useChatSocket = () => {
    return useContext(ChatSocketContext);
}

export const useDirectsList = () => {
    return useContext(DirectsListContext);
}

export const useRoomsList = () => {
    return useContext(RoomsListContext)
}

const ChatProvider = ({ children }) => {
    const [socket, setSocket] = useState();
    const [directs, setDirects] = useState([]);
    const [rooms, setRooms] = useState([]);

    const user = useSelector(state => state.user.user);

    useEffect(() => {
        if (!user) return;

        const s = io('wss://vmsocket.megaverse.today');

        setSocket(s);

        const handleConnect = () => {
            s.emit('login', {
                jwt: localStorage.getItem('token')
            });
        }

        const handleLoginResp = () => {
            s.emit('pv-get-list');
            s.emit('get-rooms');
        }

        const handleGetDirectsList = (directs) => {
            console.log('directs', directs);
            setDirects(directs)
        }

        const handleGetRoomsList = (data) => {
            console.log('rooms', data.rooms);
            setRooms(data.rooms)
        }

        const handleErrors = (e) => {
            console.log('errors', e);
        }

        s.on('connect', handleConnect);
        s.on('login-resp', handleLoginResp);
        s.on('pv-get-list-resp', handleGetDirectsList);
        s.on('get-rooms-resp', handleGetRoomsList);
        s.on('error', handleErrors)

        return () => {
            s.off('connect', handleConnect);
            s.off('login-resp', handleLoginResp);
            s.off('pv-get-list-resp', handleGetDirectsList);
            s.off('get-rooms-resp', handleGetRoomsList);
            s.off('error', handleErrors);

            s.close();
        }
    }, [user])

    return (
        <ChatSocketContext.Provider value={socket}>
            <DirectsListContext.Provider value={directs}>
                <RoomsListContext.Provider value={rooms}>
                    {children}
                </RoomsListContext.Provider>
            </DirectsListContext.Provider>
        </ChatSocketContext.Provider>
    );
};

export default ChatProvider;