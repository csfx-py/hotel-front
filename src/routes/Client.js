import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { ClientContext } from "../contexts/ClientContext";
import { AppBar, makeStyles, Tab, Tabs } from "@material-ui/core";
import TabPanel from "../components/TabPanel";
import Menu from "../views/Client/Menu";
import Cart from "../views/Client/Cart";
import Orders from "../views/Client/Orders";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Client() {
  const { shopName, tableID } = useParams();
  const { setConn } = useContext(ClientContext);

  const classes = useStyles();

  const { sendData } = useSocket(shopName, tableID);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Cart shopName={shopName} tableID={tableID} sendData={sendData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Orders shopName={shopName} tableID={tableID} />
      </TabPanel>
    </div>
  );
}

export default Client;
