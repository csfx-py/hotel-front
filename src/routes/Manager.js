import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UtilityContext } from "../contexts/UtilityContext";
import { AuthContext } from "../contexts/AuthContext";
import { DataContext } from "../contexts/DataContext";
import useManagerSocket from "../hooks/useManagerSocket";
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
import Orders from "../views/Manager/Orders";
import NewOrders from "../views/Manager/NewOrders";
import Menu from "../views/Manager/Menu";
import logo from "../images/logo.png";
import Settings from "../views/Manager/Settings";

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

  const { user, checkCookie, logout } = useContext(AuthContext);
  const history = useHistory();

  const checkUser = async () => {
    const isLoggedIn = await checkCookie();
    if (!isLoggedIn) {
      history.push("/login");
    }
  };

  useEffect(() => {
    checkUser();
    return () => {
      logout();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { removeTempItem, removeItem, removeConn } = useManagerSocket(
    user.shopName
  );

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
        <NewOrders removeTempItem={removeTempItem} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Menu />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Settings />
      </TabPanel>
    </div>
  );
}

export default Manager;
