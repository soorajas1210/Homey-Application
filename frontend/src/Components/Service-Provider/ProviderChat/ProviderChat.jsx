import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bookedServiceDetails } from '../../../actions/servicesActions';
import { getChats } from '../../../actions/userActions';

import {io} from 'socket.io-client'
import "./Chat.css"
import Conversation from './Conversation';
import ChatBox from './ChatBox/ChatBox';
import NavIcons from '../../Chat/NavIcons/NavIcons';


function ProviderChat() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receivedMessage, setReceivedMessage] = useState(null);

    useEffect(() => {
        dispatch(bookedServiceDetails(id));
    }, [id]);
    const details = useSelector((state) => state.providerBookedDetails);
    const { providerBookedDetails } = details;

    console.log("providerBookedDetails is ", providerBookedDetails)

    const uid = providerBookedDetails?.providerId?.userId

    console.log("uid", uid)



    // socket
    const socket = useRef()
    console.log("id", id)

    useEffect(() => {
        dispatch(getChats())

    }, [])

    useEffect(() => {
        socket.current = io('http://localhost:8800')
        socket.current.emit("new-user-add", uid)
        socket.current.on('get-users', (users) => setOnlineUsers(users))
    }, [uid])



    // Send Message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);

    // Get the message from socket server
    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
            console.log(data)
            setReceivedMessage(data);
        }

        );
    }, []);

    const chatUsers = useSelector((state) => state.userChats)
    const { chats } = chatUsers;

    const checkOnlineStatus = (chat) => {
        const chatMember = chat?.members?.find((member) => member !== uid);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    };

  return (
    <>
          <div className='Chat'>
              {/* {Left Side} */}
              <div className='Left-side-chat'>
                  <div className="Chat-container">
                      <h2> Chats</h2>
                      <div className="Chat-list">
                          <Conversation
                              data={chats[0]}
                              currentUser={uid}
                          online={checkOnlineStatus(chats[0])}
                          />
                      </div>

                  </div>
              </div>
              {/* {Right side}      */}

              <div className="Right-side-chat">
                  <div style={{ width: "20rem", alignSelf: "flex-end" }}>
                      <NavIcons />
                  </div>
                  <ChatBox
                      chat={chats[0]}
                      currentUser={uid}
                  setSendMessage={setSendMessage}
                  receivedMessage={receivedMessage}
                  />
              </div>


          </div > 
    </>
  )
}

export default ProviderChat
