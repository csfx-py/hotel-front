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
  input: {
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
}));

function RegisterCard() {
  const classes = useStyles();

  const history = useHistory();

  const passPattern =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$!%*?&.]{6,20}/;

  const mailPattern =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  const phonePattern = /^[6789]\d{9}$/;

  const { toast, setIsLoading } = useContext(UtilityContext);
  const { register } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    shopName: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email, phone, password, shopName } = credentials;
    if (name && email && phone && password && shopName) {
      if (!mailPattern.test(email)) {
        setIsLoading(false);
        toast("Invalid email address", "error");
        return;
      }
      if (!phonePattern.test(phone)) {
        setIsLoading(false);
        toast("Invalid phone number", "error");
        return;
      }
      if (!passPattern.test(password)) {
        setIsLoading(false);
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
      try {
        const res = await register({ name, email, phone, password, shopName });
        setIsLoading(false);

        if (res) {
          setCredentials({
            name: "",
            email: "",
            password: "",
            phone: "",
            shopName: "",
          });
        }

        if (res) history.push("/hotel");
      } catch (err) {
        setIsLoading(false);
        toast(err.message, "error");
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
              label="Phone Number"
              type="number"
              className={classes.input}
              name="phone"
              value={credentials.phone}
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
