import { useContext, useState } from "react";
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
    id: "total",
    label: "Total",
    minWidth: 100,
  },
];

function Orders() {
  const classes = useStyles();

  const { setLoading, setMessage } = useContext(AuthContext);

  const { menu } = useContext(ClientContext);

  const [rows, setRows] = useState([]);

  return (
    <div className={classes.root}>
      <DataTable rows={rows} columns={columns} />
    </div>
  );
}

export default Orders;
