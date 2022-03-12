import React, { useEffect, useState } from 'react'
import './profile.css'
import TopBar from '../../components/Topbar/topbar'
import Feed from '../../components/Feed/feed';
import Rightbar from '../../components/RightBar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import {useParams} from "react-router-dom"


function Profile() {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const params = useParams();
    // console.log(params);                  // In App.js we write profile/:username

    const [user, setUser] = useState({})
    useEffect(() => {                        // See documentation of useEffect
        const fetchUser = async()=>{
            const res = await axios.get(`/users/userr?username=${params.username}`)
            setUser(res.data);
        }
        fetchUser();
    },[params.username])
    // console.log("----",user)

    return (
        <div>
            <TopBar />
            <div className="profileContainor">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="ProfileCover">
                            <img src={(user.CoverPicture)?(PublicFolder+user.CoverPicture):(PublicFolder+'profiles/DefCover.jpg')} alt="" className="profileCoverImg" />
                            <img src={(user.ProfilePicture)?(PublicFolder+user.ProfilePicture):(PublicFolder+'profiles/DefProfile.png')} alt="" className="profileMainImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores, in.</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={params.username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
