import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

export default function useManagerSocket(
  shopName,
  setMessage,
  tables,
  setTables,
  tempOrders,
  setTempOrders
) {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { role: "manager", shopName },
    });

    socketRef.current.on("message", (message) => {
      setMessage(message);
    });

    socketRef.current.on("managerOrder", (data) => {
      setTables(data);
    });

    socketRef.current.on("managerNewOrder", (data, client) => {
      setTempOrders([...tempOrders, { ...data, client }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopName]);

  const sendData = (data) => {
    const test = socketRef.current.emit("order", data);
  };
  return { sendData };
}
