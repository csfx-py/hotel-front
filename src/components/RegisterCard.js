import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { BsFillShieldLockFill } from "react-icons/bs";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

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

function RegisterCard() {
  const classes = useStyles();

  const history = useHistory();

  const passPattern =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$!%*?&.]{6,20}/;

  const mailPattern =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  const { register, toast } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    shopName: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, shopName } = credentials;
    if (name && email && password && shopName) {
      if (!passPattern.test(password)) {
        toast(
          `Password must be at least 6 characters long
           and contain at least one lowercase letter, 
           one uppercase letter, 
           one number and 
           one special character`,
          "error"
        );
        return;
      }
      if (!mailPattern.test(email)) {
        toast("Invalid email address", "error");
        return;
      }
      try {
        const res = await register({ name, email, password, shopName });
        setCredentials({ name: "", email: "", password: "", shopName: "" });
        if (res) history.push("/hotel");
      } catch (err) {
        toast(err.message, "error");
      }
    }
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
              Sign Up
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
              label="Shop Name"
              name="shopName"
              value={credentials.shopName}
              fullWidth
              required
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              value={credentials.email}
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
          <Typography>
            Already have an account?{" "}
            <Link to="/login">
              <Typography color="primary" component="span">
                Sign in here
              </Typography>
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default RegisterCard;
