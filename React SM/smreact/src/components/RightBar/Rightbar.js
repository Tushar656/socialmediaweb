import React, { useContext, useEffect, useState } from 'react'
import './Rightbar.css'
import { Users } from '../../dummyData'
import Online from '../Online/Online'
import axios from 'axios'
import {Link} from 'react-router-dom';
import { AuthContext } from '../../context/Authcontext'
import AddIcon from '@mui/icons-material/Add';

function Rightbar({user}) {
    

    const HomeRightBar = () => {

        return (
            <>
                <div className="BDcontainor">
                    <img src="assets/gift.png" alt="" className="bdIMG" />
                    <span className="BDtext">
                        <b>Raj</b> and <b>3 other friends</b> have birthday today.
                    </span>
                </div>
                <div className="addContainor">
                    <img src="assets/add.jpg" alt="" className="addvtisment" />
                </div>
                <div className="rightMainContainor">
                    <h4 className="rightTitle">Online Friends</h4>
                    <ul className="OnlineFrndList">
                        {
                            Users.map((u) => (
                                <Online key={u.id} user={u} />
                            ))
                        }
                    </ul>
                </div>
            </>
        )

    }




    const ProfileRightBar = () => {
        const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
        const [frineds , setFriends] = useState([])
        const {user: currentUser, dispatch} = useContext(AuthContext);
        useEffect(()=>{
            const getFriends = async()=>{
                // console.log("--",user)
                try{
                    const friendList = await axios.get('/users/friends/'+ user._id);
                    setFriends(friendList.data);
                }catch(err){
                    console.log(err)
                }
            }
            getFriends();
        }, [user]);

        const [followed, setFollowed] = useState(currentUser.followeing.includes(user._id));
        // console.log("----", currentUser)
        useEffect(()=>{
            setFollowed(currentUser.followeing.includes(user._id))
            // console.log("---------------")
        }, [currentUser, user._id] )
        // console.log(followed +" " + currentUser.followeing[0])
        const followHendeler = async() =>{
            try{
                if(!followed){
                    await axios.put('/users/' + user._id + '/follow', {userId: currentUser._id});
                    dispatch({type: "FOLLOW", payload: user._id});
                }else{
                    await axios.put('/users/' + user._id + '/unfollow', {userId: currentUser._id})
                    dispatch({type: "UNFOLLOW", payload: user._id});
                }
            }catch(err){
                console.log("Follow error")
            }
            setFollowed(!followed)
        }

        

        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="rightBarFollowBtn" onClick={followHendeler}> 
                        {followed? "Unfollow" : "Follow"}
                        {followed? "-" : <AddIcon/>}
                    </button>
                )}
                <h4 className="rpTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City : </span>
                        <span className="rightbarInfoValue">{user.city} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From : </span>
                        <span className="rightbarInfoValue">{user.from} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship : </span>
                        <span className="rightbarInfoValue">{user.RelationShip} </span>
                    </div>
                </div>
                <h4 className="rpTitle">User Friends</h4>
                <div className="rightbarFollowings">
                        {
                            frineds.map((friend)=>(
                                <Link to={'/profile/'+friend.username} className="FriendLink">
                                    <div className="rightBarFollowing" key={friend._id}>
                                        <img src={friend.ProfilePicture ? PublicFolder+friend.ProfilePicture : PublicFolder+'profiles/DefProfile.png'} alt="" className="rpFollowingImg" />
                                        <span className="rpFollowingName">{friend.username}</span>
                                    </div>
                                </Link>
                                ))
                        }
                </div>
            </>
        )
    }





    return (
        <div className="RightBar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightBar/> : <HomeRightBar/>}
            </div>
        </div>
    )
}

export default Rightbar
