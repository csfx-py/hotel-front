import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({
  children,
  user,
  setMessage,
  loading,
  setLoading,
}) => {
  const api = axios.create({
    baseURL: `http://localhost:5000/data`,
    withCredentials: true,
    headers: { auth: user?.token ? user.token : "" },
  });

  const [menu, setMenu] = useState([]);

  const fetchMenu = async ({ shopName }) => {
    setMessage("");
    try {
      const res = await api.get("/menu", {
        params: {
          shopName,
        },
      });
      if (res.status === 200 && res.data.length > 0) {
        return setMenu(res.data);
      }
    } catch (e) {
      return setMessage("fetching menu failed");
    }
  };

  const addMenuItem = async ({ itemName, itemPrice }) => {
    setMessage("");
    try {
      const res = await api.put("/menu", {
        itemName,
        itemPrice,
        shopName: user.shopName,
      });
      if (res.status === 200 && res.data.length > 0) {
        return setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      return setMessage(e.message);
    }
  };

  const deleteMenuItem = async ({ name }) => {
    setMessage("");
    try {
      const res = await api.delete("/menu", {
        params: {
          itemName: name,
          shopName: user.shopName,
        },
      });
      if (res.status === 200 && res.data.length > 0) {
        return setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      return setMessage(e.message);
    }
  };

  useEffect(() => {
    fetchMenu({ shopName: user.shopName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user]);

  return (
    <DataContext.Provider value={{ menu, addMenuItem, deleteMenuItem }}>
      {children}
    </DataContext.Provider>
  );
};
