import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
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

function Orders() {
  const classes = useStyles();

  const { tables } = useContext(DataContext);
  useEffect(() => {}, [tables]);

  const [tableName, setTableName] = useState("");
  const [rows, setRows] = useState([]);

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
            const index = tables.findIndex(
              (table) => table.tableID === e.target.value
            );
            setRows(tables[index].items);
          }}
        >
          {tables.map((table) => (
            <MenuItem key={table.tableID} value={table.tableID}>
              {table.tableID}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DataTable rows={rows} columns={columns} />
    </div>
  );
}

export default Orders;
