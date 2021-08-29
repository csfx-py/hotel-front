import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

export default function useManagerSocket(
  shopName,
  toast,
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
      toast(message);
    });

    socketRef.current.on("managerOrder", (data) => {
      setTables(data);
    });

    socketRef.current.on("managerNewOrder", (data, client) => {
      data = data.map((datum) => {
        datum.client = client;
        return datum;
      });
      setTempOrders([...tempOrders, ...data]);
      toast("New orders available", "info");
    });

    return () => {
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopName]);

  const removeItem = (data, tableID) => {
    socketRef.current.emit("removeItem", data, tableID);
  };

  const removeConn = (tableID) => {
    socketRef.current.emit("removeConn", tableID);
  };

  return { removeItem, removeConn };
}
