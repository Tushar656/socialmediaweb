const { Socket } = require('socket.io');

const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000"
    },
});

let users = [];                    // contain userId and socketId

const addUser = (userId, socketId)=>{
    !users.some((user)=>user.userId === userId) && 
        users.push({userId, socketId})
}
const removeuser = (socketId) =>{
    users = users.filter(user => user.socketId !== socketId);
}
const getUser = (userId) => {
    return users.find((user)=> user.userId === userId)
}

io.on('connection', (mySocket)=>{

    // CONNECT
    console.log("A user Connected");

    //take userid and socketid from user
    mySocket.on('addUser', (userId)=>{
        addUser(userId, mySocket.id)
        io.emit("getUsers", users)
    })

    //SEND AND GET MESSAGE
    mySocket.on("sendMessage", ({senderId, recieverId, text})=>{
        const user = getUser(recieverId);
        io.to(user.socketId).emit("getMessage", {
            senderId, 
            text,  
        });
    });
    

    //DISCONNECT
    mySocket.on('disconnect', ()=>{
        console.log("a user disconnected")
        removeuser(mySocket.id);
        io.emit("getUsers", users)
    })
})