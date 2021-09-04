import { useContext, useEffect, useState } from "react";
import { UtilityContext } from "../../contexts/UtilityContext";
import { DataContext } from "../..//contexts/DataContext";
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import DataTable from "../../components/DataTable";

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

  const { setIsLoading } = useContext(UtilityContext);
  const { menu, fetchMenu, addMenuItem, deleteMenuItem } =
    useContext(DataContext);

  const [item, setItem] = useState({ itemName: "", itemPrice: 0 });

  useEffect(() => {
    fetchMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [menu]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await addMenuItem(item);
    setItem({ itemName: "", itemPrice: 0 });
  };

  const handleDelete = async (item) => {
    setIsLoading(true);
    await deleteMenuItem(item.name);
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
              value={item.itemName}
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
              value={item.itemPrice}
              margin="normal"
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
      <DataTable rows={menu} columns={columns} handleDelete={handleDelete} />
    </div>
  );
}

export default Menu;
