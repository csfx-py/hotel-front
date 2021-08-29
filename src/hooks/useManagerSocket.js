import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

export default function useManagerSocket(
  shopName,
  toast,
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
      toast(message);
    });

    socketRef.current.on("managerOrder", (data) => {
      setTables(data);
    });

    socketRef.current.on("managerNewOrder", (data, client) => {
      data.map((datum) => {
        datum.id = Math.floor(Math.random() * Date.now());
        datum.client = client;
        return datum;
      });
      console.log(tempOrders);
      setTempOrders([...tempOrders, ...data]);
      toast("New orders available", "info");
    });

    return () => {
      socketRef.current.disconnect();
      setTempOrders([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopName]);

  const removeItem = (data, tableID) => {
    socketRef.current.emit("removeItem", data, tableID);
  };

  return { removeItem };
}
