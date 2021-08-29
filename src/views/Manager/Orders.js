import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import { DataContext } from "../../contexts/DataContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

function Orders({ removeItem }) {
  const classes = useStyles();

  const { tables, tempOrders } = useContext(DataContext);
  useEffect(() => {
    const table = tables.find((t) => t.tableID === tableName);
    if (table) {
      setRows(table.items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tables, tempOrders]);

  const [tableName, setTableName] = useState("");
  const [rows, setRows] = useState([]);

  const handleDelete = (row) => {
    setRows(rows.filter((r) => r.id !== row.id));
    removeItem(row, tableName);
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Tables</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tableName}
          onChange={(e) => {
            setTableName(e.target.value);
            const table = tables.find((t) => t.tableID === e.target.value);
            setRows(table.items);
          }}
        >
          {tables.map((table) => (
            <MenuItem key={table.tableID} value={table.tableID}>
              {table.tableID}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DataTable rows={rows} columns={columns} handleDelete={handleDelete} />
      <Typography variant="h6" gutterBottom color="secondary">
        Total: {rows.reduce((acc, cur) => acc + cur.total, 0)}
      </Typography>
    </div>
  );
}

export default Orders;
