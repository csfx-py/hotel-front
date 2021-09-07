import { useContext, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { DataContext } from "../contexts/DataContext";
import { UtilityContext } from "../contexts/UtilityContext";

const SOCKET_SERVER_URL = "http://localhost:5000";

export default function useManagerSocket(shopName) {
  const socketRef = useRef();
  const { toast } = useContext(UtilityContext);
  const { setTables, setTempOrders } = useContext(DataContext);

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { shopName },
    });

    socketRef.current.on("message", (message) => {
      toast(message);
    });

    socketRef.current.on("managerOrder", (data) => {
      setTables(data);
    });

    socketRef.current.on("managerNewOrder", (data) => {
      setTempOrders(data);
      toast("Temporary orders updated", "info");
    });

    return () => {
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopName]);

  const removeTempItem = (data) => {
    socketRef.current.emit("removeTempItem", data);
  };

  const removeItem = (data, tableID) => {
    socketRef.current.emit("removeItem", data, tableID);
  };

  const removeConn = (tableID) => {
    socketRef.current.emit("removeConn", tableID);
  };

  return { removeTempItem, removeItem, removeConn };
}
