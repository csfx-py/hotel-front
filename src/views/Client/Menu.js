import { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
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
    id: "add",
    label: "Add to card",
    minWidth: 100,
  },
];

function Menu() {
  const classes = useStyles();

  const { setLoading } = useContext(AuthContext);

  const { menu, cart, setCart } = useContext(ClientContext);

  const [rows, setRows] = useState([]);

  const handleAdd = (row) => {
    setLoading(true);
    const itemList = cart.filter((item) => item.name === row.name);
    if (itemList.length > 0) {
      const cartCopy = [...cart];
      const item = cartCopy.filter((item) => item.name === row.name)[0];
      item.qty += 1;
      item.total = item.qty * item.price;
      setCart(cartCopy);
      return setLoading(false);
    }
    setCart([
      ...cart,
      { name: row.name, price: row.price, qty: 1, total: row.price },
    ]);
    setLoading(false);
  };

  useEffect(() => {}, [cart]);

  useEffect(() => {
    setRows(menu);
  }, [menu]);

  return (
    <div className={classes.root}>
      <DataTable rows={rows} columns={columns} handleAdd={handleAdd} />
    </div>
  );
}

export default Menu;
