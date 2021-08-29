import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useClientSocket from "../hooks/useClientSocket";
import { AppBar, makeStyles, Tab, Tabs } from "@material-ui/core";
import TabPanel from "../components/TabPanel";
import Menu from "../views/Client/Menu";
import Cart from "../views/Client/Cart";
import Orders from "../views/Client/Orders";
import { ClientContext } from "../contexts/ClientContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Client() {
  const { shopName, tableID } = useParams();
  const history = useHistory();
  const { conn, fetchMenu } = useContext(ClientContext);

  const classes = useStyles();

  const { sendCart, fetchOrders } = useClientSocket(shopName, tableID);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!conn) history.push(`/hotel/${shopName}/${tableID}/auth`);
    fetchMenu(shopName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conn]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Menu" />
          <Tab label="Cart" />
          <Tab label="Orders" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Menu />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Cart shopName={shopName} tableID={tableID} sendCart={sendCart} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Orders shopName={shopName} tableID={tableID} fetchOrders={fetchOrders} />
      </TabPanel>
    </div>
  );
}

export default Client;
