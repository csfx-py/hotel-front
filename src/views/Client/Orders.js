import { useContext, useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import DataTable from "../../components/DataTable";
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
    id: "total",
    label: "Total",
    minWidth: 100,
  },
];

function Orders() {
  const classes = useStyles();

  const { orders } = useContext(ClientContext);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(orders);
  }, [orders]);

  return (
    <div className={classes.root}>
      <DataTable rows={rows} columns={columns} />
      <Typography variant="h6" gutterBottom color="secondary">
        Total: {orders.reduce((acc, curr) => acc + curr.total, 0)}
      </Typography>
    </div>
  );
}

export default Orders;
