import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AuthContext } from "../contexts/AuthContext";
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

function ResetPass() {
  const classes = useStyles();

  const { setIsLoading, toast } = useContext(UtilityContext);
  const { getOtp } = useContext(AuthContext);

  const [data, setData] = useState({
    name: "",
    otp: "",
    newPass: "",
    confirm: "",
  });

  const [isOtpDisable, setIsOtpDisable] = useState(true);
  const [isPassDisable, setIsPassDisable] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
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
            onSubmit={(params) => {}}
            autoComplete="off"
            className={classes.form}
          >
            <BsFillShieldLockFill color="#10b981" fontSize="2rem" />
            <Typography variant="h5" component="h2" align="center">
              Reset Password
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  label="Username"
                  name="name"
                  value={data.name}
                  required
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={5}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  className={classes.btn}
                  onClick={async (e) => {
                    if (!data.name.length > 0) {
                      toast("Enter Username", "error");
                      return;
                    }
                    setIsLoading(true);
                    const res = await getOtp(data.name);
                    setIsLoading(false);
                    if (res) {
                      setIsOtpDisable(false);
                      return;
                    }
                  }}
                >
                  Request OTP
                </Button>
              </Grid>
            </Grid>
            {!isOtpDisable && (
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    label="Enter OTP"
                    name="otp"
                    value={data.otp}
                    required
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    className={classes.btn}
                    onClick={(e) => {
                      setIsPassDisable(false);
                    }}
                  >
                    Submit OTP
                  </Button>
                </Grid>
              </Grid>
            )}
            {!isPassDisable && (
              <TextField
                label="New Password"
                name="newPass"
                value={data.newPass}
                type="password"
                fullWidth
                required
                onChange={handleChange}
              />
            )}
            {!isPassDisable && (
              <TextField
                label="Confirm New Password"
                name="confirm"
                value={data.confirm}
                type="password"
                fullWidth
                required
                onChange={handleChange}
              />
            )}
            {!isPassDisable && (
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.btn}
                fullWidth
              >
                Submit
              </Button>
            )}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ResetPass;
