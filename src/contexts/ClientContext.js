import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ClientContext = createContext();

export const ClientProvider = ({
  children,
  setMessage,
  loading,
  setLoading,
}) => {
  const api = axios.create({
    baseURL: `http://localhost:5000/client`,
    withCredentials: true,
  });

  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

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
    <ClientContext.Provider value={{ menu, checkHotel, cart, setCart }}>
      {children}
    </ClientContext.Provider>
  );
};
