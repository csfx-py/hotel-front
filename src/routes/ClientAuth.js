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
import { Link, useHistory, useParams } from "react-router-dom";
import { ClientContext } from "../contexts/ClientContext";

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

function ClientAuth() {
  const classes = useStyles();
  const { shopName, tableID } = useParams();

  const { checkTable } = useContext(ClientContext);

  const [pass, setPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass) {
      try {
        const res = await checkTable(shopName, tableID, pass);
        if (!res) setPass("");
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
          <form onSubmit={handleSubmit} className={classes.form}>
            <BsFillShieldLockFill color="#10b981" fontSize="2rem" />
            <Typography variant="h5" component="h2" align="center">
              Join Session
            </Typography>
            <TextField
              label="Password"
              name="password"
              value={pass}
              type="password"
              fullWidth
              required
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.btn}
              fullWidth
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ClientAuth;
