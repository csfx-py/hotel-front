import { useContext, useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import TabPanel from "../components/TabPanel";
import Menu from "../views/Manager/Menu";
import Orders from "../views/Manager/Orders";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { AuthContext } from "../contexts/AuthContext";
import useManagerSocket from "../hooks/useManagerSocket";
import { DataContext } from "../contexts/DataContext";
import NewOrders from "../views/Manager/NewOrders";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Manager() {
  const classes = useStyles();

  const { user, toast, setLoading, logout } = useContext(AuthContext);
  const { tables, setTables, tempOrders, setTempOrders } =
    useContext(DataContext);

  const [value, setValue] = useState(0);

  const { removeItem, removeConn } = useManagerSocket(
    user.shopName,
    toast,
    setTables,
    tempOrders,
    setTempOrders
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <img src={logo} alt="Hotel engine" />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            Hotel engine
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Tables Summary" />
          <Tab label="Orders" />
          <Tab label="Menu" />
          <Tab label="Settings" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Orders removeItem={removeItem} removeConn={removeConn} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NewOrders />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Menu setLoading={setLoading} />
      </TabPanel>
      <TabPanel value={value} index={3}></TabPanel>
    </div>
  );
}

export default Manager;
