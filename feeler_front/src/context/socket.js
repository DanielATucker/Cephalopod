import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect("100.69.19.3:3000");
export const SocketContext = React.createContext();