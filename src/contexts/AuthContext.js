import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import { useSnackbar } from "notistack";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const api = axios.create({
    baseURL: `http://localhost:5000/auth`,
    withCredentials: true,
    headers: { auth: user?.token ? user.token : "" },
  });

  const [message, setMessage] = useState("");
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (message !== "") enqueueSnackbar(message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const login = async ({ name, password }) => {
    setMessage("");
    try {
      const res = await api.post("/login", { name, password });
      if (res.status === 200 && res.data) {
        const { name, shopName } = jwt_decode(res.data);
        setUser({ name, shopName, token: res.data });
        return Cookie.set("Authid", res.data);
      }
    } catch (e) {
      setMessage(e.message);
      return false;
    }
  };

  const register = async ({ name, email, password, shopName }) => {
    setMessage("");
    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        shopName,
      });
      if (res && res.data) {
        const { name, shopName } = jwt_decode(res.data);
        setUser({ name, shopName, token: res.data });
        return Cookie.set("Authid", res.data);
      }
    } catch (e) {
      return setMessage(e.message);
    }
  };

  const logout = () => {
    setUser({});
    Cookie.remove("Authid");
  };

  useEffect(() => {
    const cookie = Cookie.get("Authid");

    if (cookie) {
      const { name, shopID, shopName, exp } = jwt_decode(cookie);
      if (Date.now() >= exp * 1000) {
        setUser({});
        Cookie.remove("Authid");
        return setMessage("Session expired");
      }
      return setUser({ name, shopID, shopName, token: cookie });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, setMessage, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};