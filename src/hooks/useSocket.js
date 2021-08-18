import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

export default function useSocket() {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendData = (data) => {
    socketRef.current.emit("pass", data);
  };
  return { sendData };
}
