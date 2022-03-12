import './Online.css'

function Online({user}) {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="OnlineFrnds">
            <div className="OnlineFrndsProfile">
                <img src={PublicFolder + user.profilePicture} alt="" className="Onlineprofile" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="OnlineName">{user.userName}</span>
        </li>
    )
}

export default Online
