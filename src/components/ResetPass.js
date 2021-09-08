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
import { useHistory } from "react-router-dom";
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
  const { getOtp, verifyOtp, resetPass } = useContext(AuthContext);

  const history = useHistory();

  const [data, setData] = useState({
    name: "",
    otp: "",
    newPass: "",
    confirm: "",
  });

  const passPattern =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$!%*?&.]{6,20}/;

  const [isNameDisable, setIsNameDisable] = useState(false);
  const [isOtpDisable, setIsOtpDisable] = useState(true);
  const [isPassDisable, setIsPassDisable] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passPattern.test(data.newPass)) {
      toast(
        `Password must be atleast 6 characters long, 
      must contain atleast one uppercase, 
      one lowercase, 
      one number and 
      one special character`,
        "error"
      );
      setData({ ...data, newPass: "", confirm: "" });
      return;
    }
    if (data.newPass !== data.confirm) {
      toast("Password and Confirm Password must be same", "error");
      setData({ ...data, newPass: "", confirm: "" });
      return;
    }
    setIsLoading(true);
    const { name, otp, newPass } = data;
    const res = await resetPass(name, otp, newPass);
    setIsLoading(false);
    if (res) return history.push("/login");
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
              Reset Password
            </Typography>
            {!isNameDisable && (
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
                        setIsNameDisable(true);
                        return;
                      }
                    }}
                  >
                    Request OTP
                  </Button>
                </Grid>
              </Grid>
            )}
            {!isOtpDisable && (
              <>
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
                      onClick={async (e) => {
                        if (!data.otp.length > 0) {
                          toast("Enter Otp", "error");
                          return;
                        }
                        setIsLoading(true);
                        const res = await verifyOtp(data.name, data.otp);
                        setIsLoading(false);
                        if (res) {
                          setIsPassDisable(false);
                          setIsOtpDisable(true);
                          return;
                        }
                      }}
                    >
                      Submit OTP
                    </Button>
                  </Grid>
                </Grid>
                <Typography variant="caption" align="center">
                  Please wait at-least 30 seconds before requesting another OTP
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={() => window.location.reload()}
                >
                  Re-Send OTP
                </Button>
              </>
            )}
            {!isPassDisable && (
              <>
                <TextField
                  label="New Password"
                  name="newPass"
                  value={data.newPass}
                  type="password"
                  fullWidth
                  required
                  onChange={handleChange}
                />
                <TextField
                  label="Confirm New Password"
                  name="confirm"
                  value={data.confirm}
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
                  Submit
                </Button>
              </>
            )}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ResetPass;
