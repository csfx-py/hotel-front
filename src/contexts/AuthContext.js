import { createContext, useContext, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import { UtilityContext } from "./UtilityContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { toast } = useContext(UtilityContext);
  const [user, setUser] = useState({});
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const api = axios.create({
    baseURL: `http://localhost:5000/auth`,
    withCredentials: true,
    headers: { auth: user?.token ? user.token : "" },
  });

  const adminLogin = async (password) => {
    try {
      const res = await api.post("/admin", { password });
      if (res.status === 200) {
        setIsAdminLoggedIn(true);
        toast("Admin logged in successfully", "success");
      }
    } catch (error) {
      toast(error.response.message, "error");
    }
  };

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

  const changePassword = async ({ oldPassword, newPassword }) => {
    try {
      const res = await api.post("/changePassword", {
        name: user.name,
        oldPassword,
        newPassword,
      });
      if (res.status === 200 && res.data) {
        const { name, shopName } = jwt_decode(res.data);
        setUser({ name, shopName, token: res.data });
        Cookie.set("Authid", res.data);
        toast("Password Changed successfully", "success");
        return true;
      }
      toast(res.data);
      return false;
    } catch (e) {
      toast(e.response.data, "error");
      return false;
    }
  };

  const checkCookie = async () => {
    const cookie = Cookie.get("Authid");

    if (cookie) {
      const { name, shopName, exp } = await jwt_decode(cookie);
      if (Date.now() >= exp * 1000) {
        setUser({});
        Cookie.remove("Authid");
        toast("Session expired", "error");
        return false;
      }
      setUser({ name, shopName, token: cookie });
      return true;
    }
    setUser({});
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        adminLogin,
        user,
        checkCookie,
        register,
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
