import { createContext, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { withRouter } from "react-router-dom";

export const ClientContext = createContext();

const ClientProviderFn = ({ children, history }) => {
  const { toast, setLoading, user } = useContext(AuthContext);

  const api = axios.create({
    baseURL: `http://localhost:5000/client`,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      auth: user.token ? user.token : "",
    },
  });

  const [conn, setConn] = useState(false);
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchMenu = async (shopName) => {
    setLoading(true);
    try {
      const response = await api.get("/menu", {
        params: { shopName },
      });
      setLoading(false);
      if (response.status === 200 && response.data.length > 0)
        return setMenu(response.data);
      return toast(response.data);
    } catch (error) {
      setLoading(false);
      toast(error.response.data, "error");
    }
  };

  const checkTable = async (shopName, tableID, pass) => {
    setLoading(true);
    try {
      const response = await api.post("/hotel", {
        shopName,
        tableID,
        pass,
      });
      setLoading(false);

      if (response.status === 200 && response.data) {
        setConn(true);
        toast(`Welcome to ${shopName}`);
        history.push(`/hotel/${shopName}/${tableID}`);
        return true;
      }
      return false;
    } catch (error) {
      setLoading(false);
      toast(error.response.data, "error");
      if (error.response.status === 404) history.push("/");
      return false;
    }
  };

  const checkOut = async () => {
    setLoading(true);
    try {
      const response = await api.post("/checkout", {
        cart,
        shopName: conn.shopName,
        tableID: conn.tableID,
      });
      setLoading(false);
      if (response.status === 200) {
        toast(response.data, "success");
        return true;
      }
      return false;
    } catch (error) {
      setLoading(false);
      toast(error.response.data, "error");
      return false;
    }
  };

  const redirect = (path) => {
    history.push(path);
  };

  return (
    <ClientContext.Provider
      value={{
        conn,
        fetchMenu,
        checkTable,
        menu,
        cart,
        setCart,
        checkOut,
        orders,
        setOrders,
        redirect,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const ClientProvider = withRouter(ClientProviderFn);
