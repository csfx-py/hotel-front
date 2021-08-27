import { createContext, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { withRouter } from "react-router-dom";

export const ClientContext = createContext();

const ClientProviderFn = ({ children, history }) => {
  const { setMessage, setLoading } = useContext(AuthContext);

  const api = axios.create({
    baseURL: `http://localhost:5000/client`,
    withCredentials: true,
  });

  const [conn, setConn] = useState(false);
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchMenu = async () => {
    setMessage("");
    setLoading(true);
    try {
      const response = await api.get("/menu", {
        params: { shopName: conn.shopName },
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

  const checkTable = async ({ shopName, tableID, pass }) => {
    setMessage("");
    setLoading(true);
    try {
      const response = await api.post("/hotel", {
        shopName,
        tableID,
        pass,
      });
      setLoading(false);

      if (response.status === 200 && response.data) {
        setMessage(`Welcome to ${shopName}`);
        history.push(`/hotel/${shopName}/${tableID}`);
        return true;
      }
      return false;
    } catch (error) {
      setLoading(false);
      // setMessage("hotel not found");
      // history.push("/");
      console.log(error.response);
      return false;
    }
  };

  const checkOut = async () => {
    setMessage("");
    setLoading(true);
    try {
      const response = await api.post("/checkout", {
        cart,
        shopName: conn.shopName,
        tableID: conn.tableID,
      });
      setLoading(false);
      if (response.status === 200) {
        setMessage(response.data);
        return true;
      }
      return false;
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
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
        checkTable,
        menu,
        cart,
        setCart,
        checkOut,
        orders,
        redirect,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const ClientProvider = withRouter(ClientProviderFn);
