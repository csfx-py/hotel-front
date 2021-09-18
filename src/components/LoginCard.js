import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { BsFillShieldLockFill } from "react-icons/bs";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { UtilityContext } from "../contexts/UtilityContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  paper: {
    padding: "4rem 1rem",
    minWidth: "400px",
    [theme.breakpoints.down("sm")]: {
      minWidth: "100%",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    margin: theme.spacing(2),
  },
}));

function LoginCard() {
  const classes = useStyles();

  const history = useHistory();

  const { setIsLoading } = useContext(UtilityContext);
  const { login } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, password } = credentials;
    if (name && password) {
      try {
        const res = await login({ name, password });
        setCredentials({ name: "", password: "" });
        setIsLoading(false);
        if (res) history.push("/hotel");
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    }
    setIsLoading(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <Paper className={classes.paper} elevation={8}>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className={classes.form}
          >
            <BsFillShieldLockFill color="#10b981" fontSize="2rem" />
            <Typography variant="h5" component="h2" align="center">
              Sign In
            </Typography>
            <TextField
              label="Username"
              name="name"
              value={credentials.name}
              fullWidth
              required
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              value={credentials.password}
              type="password"
              fullWidth
              required
              onChange={handleChange}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.btn}
              fullWidth
            >
              Sign in
            </Button>
          </form>
          <Typography gutterBottom>
            Don't have an account?{" "}
            <Link to="/register">
              <Typography color="primary" component="span">
                Sign up here
              </Typography>
            </Link>
          </Typography>
          <Typography>
            <Link to="/reset">
              <Typography color="primary" component="span">
                Forgot password?
              </Typography>
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginCard;
