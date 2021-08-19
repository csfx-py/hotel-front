import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ClientContext } from "../contexts/ClientContext";
import { AppBar, makeStyles, Tab, Tabs } from "@material-ui/core";
import TabPanel from "../components/TabPanel";
import Menu from "../views/Client/Menu";
import Cart from "../views/Client/Cart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Client() {
  const classes = useStyles();

  const { hotelID, tableID } = useParams();
  const history = useHistory();

  const { checkHotel, menu } = useContext(ClientContext);

  const getHotel = async () => {
    if (!(await checkHotel(hotelID))) history.push("/404");
  };

  useEffect(() => {
    getHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [menu]);

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
        <Cart />
      </TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
    </div>
  );
}

export default Client;
