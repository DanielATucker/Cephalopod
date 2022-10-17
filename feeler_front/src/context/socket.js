import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect("ws://localhost:3000");
export const SocketContext = React.createContext();