import { useContext, useEffect, useState } from "react";
import { UtilityContext } from "../../contexts/UtilityContext";
import { DataContext } from "../../contexts/DataContext";
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import DataTable from "../../components/DataTable";

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

function Orders({ removeItem, removeConn }) {
  const classes = useStyles();

  const { setIsLoading } = useContext(UtilityContext);
  const { tables, saveOrder } = useContext(DataContext);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tables]);

  const [tableName, setTableName] = useState("");

  const handleDelete = (row) => {
    removeItem(row, tableName);
    setRows(rows.filter((r) => r.id !== row.id));
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
      {rows.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={async (e) => {
            setIsLoading(true);
            await saveOrder(
              tableName,
              rows,
              rows.reduce((acc, cur) => acc + cur.total, 0)
            );
            removeConn(tableName);
            setIsLoading(false);
          }}
        >
          Save Order
        </Button>
      )}
    </div>
  );
}

export default Orders;
