import { useContext, useEffect, useState } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import DataTable from "../../components/DataTable";
import { AuthContext } from "../..//contexts/AuthContext";
import { ClientContext } from "../..//contexts/ClientContext";

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
    id: "qty",
    label: "Quantity",
    minWidth: 100,
  },
  {
    id: "total",
    label: "Total",
    minWidth: 100,
  },
  {
    id: "del",
    label: "Delete item",
    minWidth: 100,
  },
];

function Cart({ shopName, tableID, sendData }) {
  const classes = useStyles();

  const { setLoading } = useContext(AuthContext);

  const { cart, setCart, checkOut } = useContext(ClientContext);

  const [rows, setRows] = useState(cart);

  const handleDelete = async (item) => {
    setLoading(true);
    await setCart(cart.filter((i) => i.name !== item.name));
    console.log(cart);
    setLoading(false);
  };

  useEffect(() => {
    setRows(cart);
  }, [cart]);

  return (
    <div className={classes.root}>
      <DataTable rows={rows} columns={columns} handleDelete={handleDelete} />
      <Typography variant="h6" gutterBottom color="primary">
        Total: {cart.reduce((acc, item) => acc + item.total, 0)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          // setLoading(true);
          // checkOut({ shopName, tableID });
          // setCart([]);
          // setLoading(false);
          sendData('lmao kek');
        }}
      >
        Order
      </Button>
    </div>
  );
}

export default Cart;
