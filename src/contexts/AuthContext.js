import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import { useSnackbar } from "notistack";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const toast = (message, variant = "default") => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  const api = axios.create({
    baseURL: `http://localhost:5000/auth`,
    withCredentials: true,
    headers: { auth: user?.token ? user.token : "" },
  });

  const register = async ({ name, email, password, shopName }) => {
    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        shopName,
      });
      if (res.status === 200 && res.data) {
        const { name, shopName } = jwt_decode(res.data);
        setUser({ name, shopName, token: res.data });
        Cookie.set("Authid", res.data);
        return true;
      }
      toast(res.data);
      return false;
    } catch (e) {
      toast(e.response.data, "error");
      return false;
    }
  };

  const login = async ({ name, password }) => {
    try {
      const res = await api.post("/login", { name, password });
      if (res.status === 200 && res.data) {
        const { name, shopName } = jwt_decode(res.data);
        setUser({ name, shopName, token: res.data });
        Cookie.set("Authid", res.data);
        return true;
      }
      toast(res.data);
      return false;
    } catch (e) {
      toast(e.response.data, "error");
      return false;
    }
  };

  const logout = () => {
    setUser({});
    Cookie.remove("Authid");
    return true;
  };

  useEffect(() => {
    const cookie = Cookie.get("Authid");

    if (cookie) {
      const { name, shopName, exp } = jwt_decode(cookie);
      if (Date.now() >= exp * 1000) {
        setUser({});
        Cookie.remove("Authid");
        return toast("Session expired", "error");
      }
      return setUser({ name, shopName, token: cookie });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, toast, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
