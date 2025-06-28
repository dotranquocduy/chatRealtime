const users = [];

const addUser = ({id, name, room}) =>{
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if(!name  ||  ! room)
        return {error: "username or room is required "};
    
    const existingValue = users.find((user)=>{
        user.room == room && user.name == name
    })
    if(existingValue)
       return {error: "username or room is taken "};

    const newUser = {id, name, room};

    users.push(newUser);

    return newUser;

};

const deleteUser = (id) =>{
    const index = users.findIndex((user) => user.id == id);
    if(index != -1 ){
        return users.slice(index, 1)[0];
    }
};
 
const getUserinRoomLists = (room) =>{
    users.filter((user) => user.room == room)
};

const getUser = (id) =>{ users.find((user) => user.id == id) };

export default {addUser, deleteUser, getUser, getUserinRoomLists};
