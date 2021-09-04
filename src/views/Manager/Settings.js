import { useContext, useState } from "react";
import { UtilityContext } from "../../contexts/UtilityContext";
import { AuthContext } from "../../contexts/AuthContext";
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
  },
  container: {
    padding: theme.spacing(2),
  },
}));

function Settings() {
  const classes = useStyles();

  const { changePassword } = useContext(AuthContext);
  const { toast } = useContext(UtilityContext);

  const [password, setPassword] = useState({
    oldPass: "",
    newPass: "",
    confirm: "",
  });

  const passPattern =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$!%*?&.]{6,20}/;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.newPass === password.confirm) {
      if (password.oldPass === password.newPass) {
        toast("New password cannot be the same as old password", "error");
        return setPassword({
          oldPass: "",
          newPass: "",
          confirm: "",
        });
      }
      if (!passPattern.test(password.newPass)) {
        toast(
          `Password must be at least 6 characters long
           and contain at least one lowercase letter,
           one uppercase letter, 
           one number and 
           one special character`,
          "error"
        );
        return setPassword({
          oldPass: "",
          newPass: "",
          confirm: "",
        });
      }
      changePassword(password.oldPass, password.newPass);
      setPassword({
        oldPass: "",
        newPass: "",
        confirm: "",
      });
      return;
    } else {
      toast("New Passwords do not match");
    }
    setPassword({
      oldPass: "",
      newPass: "",
      confirm: "",
    });
    return;
  };

  return (
    <div className={classes.root}>
      <Paper>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3} className={classes.container}>
            <Grid item xs={12}>
              <Typography variant="h5">Change Password</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                type="password"
                name="oldPass"
                value={password.oldPass}
                label="Old Password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                type="password"
                name="newPass"
                value={password.newPass}
                label="New Password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                type="password"
                name="confirm"
                value={password.confirm}
                label="Confirm New Password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default Settings;
