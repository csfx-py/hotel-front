import { useContext, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { ClientContext } from "../contexts/ClientContext";

const SOCKET_SERVER_URL = "https://hoen-api.herokuapp.com";

export default function useClientSocket(shopName, tableID) {
  const socketRef = useRef();
  const { setOrders } = useContext(ClientContext);

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { shopName, tableID },
    });

    socketRef.current.on("orders", (items) => {
      setOrders(items);
    });

    socketRef.current.on("complete", () => {
      socketRef.current.close();
      window.location.href = "/";
    });

    return () => {
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopName, tableID]);

  const sendCart = (data) => {
    socketRef.current.emit("clientOrder", data);
  };

  return { sendCart };
}
