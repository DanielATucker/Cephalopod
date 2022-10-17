import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect("localhost:3001");
export const SocketContext = React.createContext();