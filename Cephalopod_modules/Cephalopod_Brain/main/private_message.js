export default function private_message (message, socket, sender_info) {
    let Message = {
        "recipient": username,
        "sender": socket.username,
        "sender_id": socket.id,
        "message": message
    }

    socket.emit("private_message", Message)  
}