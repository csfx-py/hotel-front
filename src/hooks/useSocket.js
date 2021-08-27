import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

export default function useSocket(shopName, tableID) {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { shopName, tableID },
    });

    socketRef.current.on("booked", () => {
      console.log("booked");
    });
    return () => {
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopName, tableID]);

  const sendData = (data) => {
    const test = socketRef.current.emit("pass", data, (error) => {
      return error;
    });
    console.log(test);
  };
  return { sendData };
}
