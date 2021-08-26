import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

export default function useSocket(shopName, tableID) {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { shopName, tableID },
    });
    return () => {
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopName, tableID]);

  const sendData = (data) => {
    socketRef.current.emit("pass", data);
    console.log(data);
  };
  return { sendData };
}
