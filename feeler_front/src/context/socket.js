import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect("ws://localhost:3001");
export const SocketContext = React.createContext();