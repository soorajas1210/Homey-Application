import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getChatUserInfo } from '../../../actions/userActions';



function Conversation({ data, currentUser, online }) {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = data?.members?.find((id) => id !== currentUser)
        console.log("conv uid", userId)
        dispatch(getChatUserInfo(userId))
    }, [currentUser])


    const cuser = useSelector((state) => state.getChatUserInfo);
    const { chatUserInfo } = cuser;

    useEffect(() => {
        if (chatUserInfo) {
            setUserData(chatUserInfo)
        }
    }, [chatUserInfo])

    return (
        <>
            <div className="follower conversation" >
                <div>
                    {online && <div className="online-dot"></div>}


                    <img src={userData?.profileImage?.url} alt={""} style={{ width: '50px', height: '50px' }} />
                    <div className='name' style={{ fontSize: "0.8rem" }} ></div>
                    <span>{userData?.firstName + " " + userData?.lastName}</span> <br/>
                    <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                </div>

            </div>
            <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
        </>
    )
}

export default Conversation
