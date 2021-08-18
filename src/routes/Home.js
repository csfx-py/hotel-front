import {
  AppBar,
  Button,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  AiFillDatabase,
  AiFillHeart,
  AiOutlineLogin,
  AiOutlineQrcode,
} from "react-icons/ai";
import HomeTop from "../images/HomeTop.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  grid: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(10),
  },
  img: {
    maxWidth: "100%",
  },
  gridItem: {
    textAlign: "center",
  },
  icon: {
    fontSize: "4rem",
    color: theme.palette.secondary.main,
    justifySelf: "center",
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Hotel Engine</Link>
          </Typography>
          <Link to="/login" className={classes.menuButton}>
            <Button variant="outlined" color="inherit">
              Login
            </Button>
          </Link>
          <Link to="/register" className={classes.menuButton}>
            <Button variant="outlined" color="inherit">
              Register
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.grid}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom color="primary">
            Hotel Engine
          </Typography>
          <Typography variant="h3" gutterBottom color="inherit">
            Your One stop spot for digitizing your hotel to the next level.
          </Typography>
          <Typography variant="h4" gutterBottom color="primary">
            What are you waiting for?
          </Typography>
          <Link to="/login">
            <Button
              size="large"
              variant="outlined"
              color="primary"
              className={classes.menuButton}
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button
              size="large"
              variant="contained"
              color="primary"
              className={classes.menuButton}
            >
              Register
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={HomeTop} alt="Home" className={classes.img} />
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <Typography variant="h4" color="inherit" align="center">
            Your hotel is now ready to be digitized.
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.grid}
        justifyContent="space-evenly"
        alignContent="center"
      >
        <Grid item xs={12} md={3} className={classes.gridItem}>
          <AiOutlineLogin className={classes.icon} />
          <Typography variant="h6" color="secondary" align="center">
            Login to start digitizing your hotel.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} className={classes.gridItem}>
          <AiOutlineQrcode className={classes.icon} />
          <Typography variant="h6" color="secondary" align="center">
            Generate QRCode for your hotel tables.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} className={classes.gridItem}>
          <AiFillDatabase className={classes.icon} />
          <Typography variant="h6" color="secondary" align="center">
            Add menu items to the database.
          </Typography>
        </Grid>
        <Typography variant="h5" color="secondary" align="center">
          Your customers scan the QR code to book tables, order items from your
          menu database and reduce the hassle.
        </Typography>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="h4" gutterBottom color="primary" align="center">
            It is as simple as that.
          </Typography>
          <Link to="/register">
            <Button
              size="large"
              variant="contained"
              color="secondary"
              className={classes.menuButton}
            >
              Start your digital journey now
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.grid}
        justifyContent="center"
        alignItems="center"
        style={{
          background: "black",
          color: "white",
        }}
      >
        <Grid item xs={3} className={classes.gridItem}>
          Made with <AiFillHeart color="#ef4444" /> by{" "}
          <Link to="https://github.com/csfx-py">
            <Typography variant="h6" color="secondary" align="center">
              Shreyas Prabhu
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
