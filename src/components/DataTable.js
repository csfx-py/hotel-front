import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { useState } from "react";
import { MdAddShoppingCart, MdDeleteForever } from "react-icons/md";
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 440,
  },
}));

function DataTable({ columns, rows, handleDelete, handleAdd }) {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper elevation={2}>
      <TableContainer className={classes.root}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value =
                        column.id !== "del" && column.id !== "add" ? (
                          row[column.id]
                        ) : column.id === "del" ? (
                          <Button
                            color="secondary"
                            size="small"
                            onClick={async(e) => {
                              const confirmed = await swal({
                                title: 'Are you sure!?',
                                text: `Processing further will permanently delete this item.`,
                                icon: 'warning',
                                buttons: true,
                                dangerMode: true
                              });
                              if (confirmed) {
                                handleDelete(row);
                              }

                            }}
                          >
                            <MdDeleteForever fontSize="1.4rem" />
                          </Button>
                        ) : (
                          <Button
                            color="secondary"
                            size="small"
                            onClick={(e) => {
                              handleAdd(row);
                            }}
                          >
                            <MdAddShoppingCart fontSize="1.4rem" />
                          </Button>
                        );
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default DataTable;
