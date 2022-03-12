import React, { useState, useEffect, useContext } from 'react'
import './feed.css'
import Share from '../share/share'
import Post from '../Posts/post'
// import {PostsData} from '../../dummyData'
import axios from "axios"
import {AuthContext} from "../../context/Authcontext"

function Feed({username}) {
    const [posts, setPosts] = useState([])
    const {user} = useContext(AuthContext)

    useEffect(() => {                        // See documentation of useEffect
        const fetchPost = async()=>{
            const res = username 
            ? await axios.get("/posts/profile/"+username) 
            : await axios.get("posts/timeline/" + `${user._id}`);
            // console.log("   ", res.data);
            setPosts(res.data.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)));
        }
        fetchPost();
    },[username, user._id])

    return (
        <div className="Feed">
            <div className="feedWrapper">
                {(username === user.username || !username) && <Share/>}
                {posts.map((p)=>{
                    return (<Post key={p._id} post={p}/>)
                })}
            </div>
        </div>
    )
}

export default Feed
