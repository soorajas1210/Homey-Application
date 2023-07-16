import React, { useEffect, useRef, useState } from 'react'
import "./Chat.css"
import { useDispatch, useSelector } from 'react-redux'
import { getChats } from '../../actions/userActions'
import NavIcons from './NavIcons/NavIcons'
import Conversation from './Conversation'
import { useParams } from 'react-router-dom'
import { bookedServiceDetails } from '../../actions/servicesActions'
import ChatBox from './ChatBox/ChatBox'
import { io } from 'socket.io-client'

function Chat() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);

    useEffect(() => {
        dispatch(bookedServiceDetails(id));
    }, [id]);

    const details = useSelector((state) => state.providerBookedDetails);
    const { providerBookedDetails } = details;

    console.log("providerBookedDetails is ", providerBookedDetails)

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const uid = userInfo._id
    const bookedId = providerBookedDetails?._id
    console.log("user id", uid)

    // socket
    const socket = useRef()
    console.log("id", id)

    useEffect(() => {
        dispatch(getChats(id))
    }, [userInfo])



    const chatUsers = useSelector((state) => state.userChats)
    const { chats } = chatUsers;



    useEffect(() => {
        socket.current = io("http://chatsocket-dlgf.onrender.com");
        socket.current.emit("new-user-add", uid);
        socket.current.on("get-users", (users) => setOnlineUsers(users));
    }, []);



    // Send Message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);

    // Get the message from socket server
    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
            console.log("data received", data);
            setReceivedMessage(data);
        });

        // Handle socket connection error
        socket.current.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
        });

        // Handle socket disconnect
        socket.current.on("disconnect", (reason) => {
            console.warn("Socket disconnected:", reason);
        });
    }, []);

    const checkOnlineStatus = (chats) => {
        const chatMember = chats?.members?.find((member) => member !== uid);
        const online = onlineUsers.find((user) => user?.userId === chatMember);
        return online ? true : false;
    };

    return (
        <div className='Chat'>
            {/* {Left Side} */}
            <div className='Left-side-chat'>
                <div className="Chat-container">
                    <h2> Chats</h2>
                    {/* <div className="Chat-list">
                        <Conversation
                            data={chats[0]}
                            currentUser={uid}
                            online={checkOnlineStatus(chats[0])}
                        />
                    </div> */}

                    {chats.map((chat) => (
                        <div
                            onClick={() => {
                                setCurrentChat(chat);
                            }}
                        >
                            <Conversation
                                data={chat}
                                currentUser={uid}
                                online={checkOnlineStatus(chat)}
                            />
                        </div>
                    ))}

                </div>
            </div>
            {/* {Right side}      */}

            <div className="Right-side-chat">
                <div style={{ width: "20rem", alignSelf: "flex-end" }}>
                    <NavIcons />
                </div>
                <ChatBox
                    chat={currentChat}
                    currentUser={uid}
                    setSendMessage={setSendMessage}
                    receivedMessage={receivedMessage}
                />
            </div>


        </div >
    )
}

export default Chat
