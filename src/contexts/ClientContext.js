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

  const fetchMenu = async (shopName) => {
    setMessage("");
    try {
      const response = await api.get("/menu", {
        params: {
          shopName,
        },
      });
      if (response.status === 200 && response.data.length > 0)
        return setMenu(response.data);
      return setMessage(response.data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const checkHotel = async (shopName) => {
    setMessage("");
    try {
      const response = await api.get("/hotel", {
        params: {
          shopName,
        },
      });

      if (response.status === 200 && response.data) {
        setMessage(`Welcome to ${response.data}`);
        fetchMenu(shopName);
        return true;
      }
      return false;
    } catch (error) {
      setMessage("hotel not found");
      return false;
    }
  };

  return (
    <ClientContext.Provider value={{ menu, checkHotel }}>
      {children}
    </ClientContext.Provider>
  );
};
