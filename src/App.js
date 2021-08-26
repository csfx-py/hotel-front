import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useContext } from "react";
import { DataProvider } from "./contexts/DataContext";
import { AuthContext } from "./contexts/AuthContext";
import Home from "./routes/Home";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";
import Manager from "./routes/Manager";
import Loading from "./views/Loading";
import Client from "./routes/Client";
import { ClientProvider } from "./contexts/ClientContext";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const { user, loading } = useContext(AuthContext);
  return (
    <div className={classes.root}>
      <Router>
        <DataProvider>
          <ClientProvider>
            {loading && <Loading />}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={LoginCard} />
              <Route exact path="/register" component={RegisterCard} />
              {user.token && (
                <Route exact path="/hotel">
                  <Manager />
                </Route>
              )}
              <Route path="/hotel/:shopName/:tableID" component={Client} />
              {/* <Route
                path="/hotel/:shopName:tableID/authorized"
                component={Client}
              /> */}
              <Route path="*" component={Home} />
            </Switch>
          </ClientProvider>
        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
