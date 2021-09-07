import { VscGear } from "react-icons/vsc";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loading: {
    display: "flex",
    background: "white",
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 99,
  },
  image: {
    height: "5rem",
    width: "5rem",
    color: theme.palette.secondary.main,
    animation: `$spin 1.5s ${theme.transitions.easing.easeInOut} infinite`,
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <VscGear className={classes.image} />
    </div>
  );
}

export default Loading;
