import { createContext, useContext, useEffect, useRef, useState } from "react";
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

  const [conn, setConn] = useState({});
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

  const checkHotel = async () => {
    setMessage("");
    setLoading(true);
    console.log(conn.shopName);
    try {
      const response = await api.get("/hotel", {
        params: { shopName: conn.shopName },
      });
      setLoading(false);

      if (response.status === 200 && response.data) {
        setMessage(`Welcome to ${response.data}`);
        fetchMenu();
        return true;
      }
      history.push("/");
      return false;
    } catch (error) {
      setLoading(false);
      setMessage("hotel not found");
      history.push("/");
      return false;
    }
  };

  const firstRef = useRef(true);
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    checkHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conn]);

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
        setConn,
        checkHotel,
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
