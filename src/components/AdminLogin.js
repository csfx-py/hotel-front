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
import { useHistory } from "react-router-dom";

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

function AdminLogin() {
  const classes = useStyles();

  const history = useHistory();

  const { adminLogin } = useContext(AuthContext);

  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password) {
      try {
        const res = await adminLogin(password);
        setPassword("");
        if (res) history.push("/admin");
      } catch (err) {
        console.error(err);
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
              Admin Sign In
            </Typography>
            <TextField
              label="Password"
              name="password"
              value={password}
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
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AdminLogin;
