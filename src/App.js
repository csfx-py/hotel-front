import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useContext } from "react";
import { DataProvider } from "./contexts/DataContext";
import { AuthContext } from "./contexts/AuthContext";
import Home from "./routes/Home";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";
import Manager from "./routes/Manager";
import NotFound from "./views/NotFound";
import Loading from "./views/Loading";
import Client from "./routes/Client";
import { ClientProvider } from "./contexts/ClientContext";

function App() {
  const { user, setMessage, setLoading, loading } = useContext(AuthContext);
  return (
    <Router>
      <DataProvider
        setMessage={setMessage}
        user={user}
        loading={loading}
        setLoading={setLoading}
      >
        <ClientProvider
          setMessage={setMessage}
          loading={loading}
          setLoading={setLoading}
        >
          {loading && <Loading />}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LoginCard} />
            <Route exact path="/register" component={RegisterCard} />
            {user.token && (
              <Route
                exact
                path="/hotel"
                component={Manager}
                setLoading={setLoading}
              />
            )}

            <Route path="/hotel/:hotelID/:tableID" component={Client} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </ClientProvider>
      </DataProvider>
    </Router>
  );
}

export default App;
