import { createContext, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user, setMessage, setLoading } = useContext(AuthContext);

  const api = axios.create({
    baseURL: `http://localhost:5000/hotel`,
    withCredentials: true,
    headers: { auth: user?.token ? user.token : "" },
  });

  const [menu, setMenu] = useState([]);
  const [tables, setTables] = useState([]);
  const [tempOrders, setTempOrders] = useState([]);

  const fetchMenu = async () => {
    setMessage("");
    try {
      const res = await api.get("/menu", {
        params: {
          shopName: user.shopName,
        },
      });
      if (res.status === 200 && res.data.length > 0) {
        return setMenu(res.data);
      }
      return setMessage(res.data);
    } catch (e) {
      return setMessage(e.response.data);
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
        fetchMenu(user.shopName);
        return setLoading(false);
      }
    } catch (e) {
      setMessage(e.response.data);
      return setLoading(false);
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
        fetchMenu(user.shopName);
        return setLoading(false);
      }
    } catch (e) {
      setMessage(e.response.data);
      return setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        menu,
        fetchMenu,
        addMenuItem,
        deleteMenuItem,
        tables,
        setTables,
        tempOrders,
        setTempOrders,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
