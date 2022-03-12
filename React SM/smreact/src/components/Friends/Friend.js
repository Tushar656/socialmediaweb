import './Friend.css'

function Friend({friend}) {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="sidebarFriend">
            <img src={PublicFolder + friend.profilePicture} alt="" className="sidebarFriendimg" />
            <span className="sidebarFriendName">{friend.userName}</span>
        </li>
    )
}

export default Friend
