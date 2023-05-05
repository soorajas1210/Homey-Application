import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import "./ChatBox.css"
import { addMessage, fetchMessages, getFullUserInfo } from '../../../../actions/userActions'


function ChatBox({ chat, currentUser, setSendMessage, receivedMessage }) {
    const dispatch = useDispatch()
    const id = chat?._id
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])


    console.log("view provider messages", messages)


    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }


    const user = useSelector((state) => state.getUserInfo)
    const { getUserInfo } = user;

    const send = useSelector((state) => state.sendMessage)
    const { sendMessage } = send;

    useEffect(() => {
        dispatch(getFullUserInfo(currentUser))
        if (chat !== null) {

            dispatch(fetchMessages(id))
        }

    }, [currentUser, id])

    const mess = useSelector((state) => state.getMessages)
    const { message } = mess;


    useEffect(() => {
        if (message) {
            setMessages(message)
        }
    }, [message])


    // Always scroll to last Message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    // Receive Message from parent component
    useEffect(() => {
        console.log("Message Arrived: ", receivedMessage)
        if (receivedMessage !== null && receivedMessage?.chatId === chat?._id) {
            setMessages([...messages, receivedMessage]);
        }

    }, [receivedMessage])


    const handleSend = (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: id,

        }
        const receiverId = chat.members.find((id) => id !== currentUser);
        // send message to socket server
        setSendMessage({ ...message, receiverId })


        dispatch(addMessage(message))

        // setMessages([...messages, sendMessage])
        setMessages((prevMessages) => [...prevMessages, message]);

        setNewMessage("")


    }

    const scroll = useRef();
    const imageRef = useRef();

    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        {/* chat-header */}
                        <div className="chat-header">
                            <div className="follower">
                                <div>
                                    <img
                                        src={getUserInfo?.pic}
                                        alt="Profile"
                                        className="followerImage"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <div className="name" style={{ fontSize: "0.9rem" }}>
                                        <span>
                                            {getUserInfo?.firstName + " " + getUserInfo?.lastName}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr
                                style={{
                                    width: "95%",
                                    border: "0.1px solid #ececec",
                                    marginTop: "20px",
                                }}
                            />
                        </div>
                        {/* chat-body */}
                        <div className="chat-body" >
                            {messages.map((message) => (
                                <>
                                    <div
                                        ref={scroll}
                                        className={
                                            message.senderId === currentUser
                                                ? "message own"
                                                : "message"
                                        }
                                    >
                                        <span>{message.text}</span>{" "}
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                </>
                            ))}
                        </div>

                        <div className="chat-sender">
                            <div onClick={() => imageRef.current.click()}>+</div>
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <div className="send-button button" onClick={handleSend}>Send</div>
                            <input
                                type="file"
                                name=""
                                id=""
                                style={{ display: "none" }}
                                ref={imageRef}
                            />
                        </div>{" "}
                    </>
                ) : (
                    <span className="chatbox-empty-message">
                        Tap on a chat to start conversation...
                    </span>
                )}
            </div>
        </>
    )
}

export default ChatBox
