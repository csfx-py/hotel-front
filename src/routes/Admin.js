import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../images/logo.png";

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
}));

const columns = [
  {
    id: "name",
    label: "UserName",
    minWidth: 150,
  },
  {
    id: "email",
    label: "E-mail",
    minWidth: 100,
  },
  {
    id: "shopName",
    label: "Shop Name",
    minWidth: 100,
  },
  {
    id: "del",
    label: "Delete",
    minWidth: 80,
  },
];

function Admin() {
  const classes = useStyles();

  const { user, logout, users, getAllUsers, deleteUser } =
    useContext(AuthContext);

  const history = useHistory();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!user.admin) {
      history.push("/admin-auth");
    } else {
      getAllUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setRows(users);
  }, [users]);

  const handleDelete = (row) => {
    deleteUser(row._id);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <img src={logo} alt="Hotel engine" />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            Hotel engine
          </Typography>
          <Button
            color="inherit"
            onClick={(e) => {
              const status = logout();
              if (status) {
                history.push("/");
              }
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <DataTable columns={columns} rows={rows} handleDelete={handleDelete} />
    </div>
  );
}

export default Admin;
