import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useContext, useState } from "react";
import { DataProvider } from "./contexts/DataContext";
import { AuthContext } from "./contexts/AuthContext";
import Home from "./routes/Home";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";
import Manager from "./routes/Manager";
import NotFound from "./views/NotFound";
import Loading from "./views/Loading";

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
          <Route path="*" component={NotFound} />
        </Switch>
      </DataProvider>
    </Router>
  );
}

export default App;
