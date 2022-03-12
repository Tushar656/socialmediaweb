import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import './Conversation.css'

function Conversation({currentUser, conversations}) {
    const [friend, setFriend] = useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=>{
        const friendId = conversations.members.find((m)=> m !== currentUser._id);

        const getFriend = async()=>{
            try{
                const res = await axios.get('users/userr?userId=' + friendId);
                setFriend(res.data);
            }catch(err){
                console.log("get friend conversation err");
            }
        }
        getFriend();
    }, [currentUser, conversations])
    // console.log(friend);

    return (
        <>
            {friend && <div className="conversation">
                <img src={friend.ProfilePicture? PF + friend.ProfilePicture : PF+"person/pro1.jpg"} alt="" className="conversationImg" />
                <span className="conversationName">{friend.username}</span>
            </div>}
        </>
    )
}

export default Conversation
