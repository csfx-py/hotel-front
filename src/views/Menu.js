import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import DataTable from "../components/DataTable";
import { DataContext } from "../contexts/DataContext";
import { AuthContext } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const columns = [
  {
    id: "name",
    label: "Name",
    minWidth: 150,
  },
  {
    id: "price",
    label: "MRP",
    minWidth: 100,
  },
  {
    id: "del",
    label: "Delete",
    minWidth: 80,
  },
];

function Menu() {
  const classes = useStyles();

  const { setLoading } = useContext(AuthContext);
  const { menu, addMenuItem, deleteMenuItem } = useContext(DataContext);

  const [item, setItem] = useState({ itemPame: "", itemPrice: 0 });
  const [rows, setRows] = useState(menu);

  useEffect(() => {
    setRows(menu);
  }, [menu]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await addMenuItem(item);
  };

  const handleDelete = async (item) => {
    setLoading(true);
    await deleteMenuItem(item);
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" component="h1">
          Menu Items
        </Typography>
        <Grid
          container
          spacing={2}
          alignItems="center"
          className={classes.root}
        >
          <Grid item xs={3}>
            <TextField
              name="itemName"
              label="Item Name"
              fullWidth
              onChange={handleChange}
              value={item.name}
              margin="normal"
              autoFocus
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="itemPrice"
              label="Price"
              type="number"
              fullWidth
              onChange={handleChange}
              value={item.price}
              margin="normal"
              autoFocus
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
      <DataTable rows={rows} columns={columns} handleDelete={handleDelete} />
    </div>
  );
}

export default Menu;
