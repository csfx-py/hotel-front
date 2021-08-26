import { createContext, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const { setMessage, setLoading } = useContext(AuthContext);

  const api = axios.create({
    baseURL: `http://localhost:5000/client`,
    withCredentials: true,
  });

  const [status, setStatus] = useState({});
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchMenu = async (shopName) => {
    setMessage("");
    setLoading(true);
    try {
      const response = await api.get("/menu", {
        params: {
          shopName,
        },
      });
      setLoading(false);
      if (response.status === 200 && response.data.length > 0)
        return setMenu(response.data);
      return setMessage(response.data);
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };

  const checkHotel = async (shopName) => {
    setMessage("");
    setLoading(true);
    try {
      const response = await api.get("/hotel", {
        params: {
          shopName,
        },
      });
      setLoading(false);

      if (response.status === 200 && response.data) {
        setMessage(`Welcome to ${response.data}`);
        fetchMenu(shopName);
        return true;
      }
      return false;
    } catch (error) {
      setLoading(false);
      setMessage("hotel not found");
      return false;
    }
  };

  return (
    <ClientContext.Provider
      value={{
        checkHotel,
        status,
        setStatus,
        menu,
        cart,
        setCart,
        orders,
        setOrders,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
