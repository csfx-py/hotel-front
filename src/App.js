import { useContext } from "react";
import { UtilityContext } from "./contexts/UtilityContext";
import { DataProvider } from "./contexts/DataContext";
import { ClientProvider } from "./contexts/ClientContext";
import { makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";
import Manager from "./routes/Manager";
import Loading from "./views/Loading";
import Client from "./routes/Client";
import ClientAuth from "./routes/ClientAuth";
import Admin from "./routes/Admin";
import AdminLogin from "./components/AdminLogin";
import ResetPass from "./components/ResetPass";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const { isLoading } = useContext(UtilityContext);
  return (
    <div className={classes.root}>
      <Router>
        <DataProvider>
          <ClientProvider>
            {isLoading && <Loading />}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={LoginCard} />
              <Route exact path="/register" component={RegisterCard} />
              <Route exact path="/reset" component={ResetPass} />
              <Route exact path="/admin-auth" component={AdminLogin} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/hotel" component={Manager} />
              <Route
                path="/hotel/:shopName/:tableID/auth"
                component={ClientAuth}
              />
              <Route path="/hotel/:shopName/:tableID" component={Client} />
              <Route path="*" component={Home} />
            </Switch>
          </ClientProvider>
        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
