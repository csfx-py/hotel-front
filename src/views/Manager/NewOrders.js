import { makeStyles } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import { DataContext } from "../../contexts/DataContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const columns = [
  {
    id: "name",
    label: "Item Name",
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

function NewOrders() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const { orders } = useContext(DataContext);
  useEffect(() => {
    setRows(orders);
  }, [orders]);

  return (
    <div className={classes.root}>
      {/* <DataTable rows={rows} columns={columns} /> */}
    </div>
  );
}

export default NewOrders;
