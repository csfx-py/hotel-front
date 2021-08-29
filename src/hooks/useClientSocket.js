import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

export default function useClientSocket(shopName, tableID, orders, setOrders) {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { role: "client", shopName, tableID },
    });

    socketRef.current.on("orders", (items) => {
      setOrders([...orders, ...items]);
    });

    return () => {
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopName, tableID]);

  const sendCart = (data) => {
    socketRef.current.emit("clientOrder", data, tableID);
  };

  return { sendCart };
}
