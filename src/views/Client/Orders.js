import {useContext, useEffect, useMemo, useState} from "react";
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
  const orderTotal = useMemo(() => orders.reduce((acc, curr) => acc + curr.total, 0)  , [orders]);

  return (
    <div className={classes.root}>
      <DataTable rows={orders} columns={columns} />
      <Typography variant="h6" gutterBottom color="secondary">
        Total: {orderTotal}
      </Typography>
    </div>
  );
}

export default Orders;
