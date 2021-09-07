import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

function Admin() {
  const { isAdminLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!isAdminLoggedIn) {
      history.push("/admin-auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminLoggedIn]);
  return <div>admin</div>;
}

export default Admin;
