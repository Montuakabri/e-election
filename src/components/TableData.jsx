import React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const DataTable = ({ columns, rows, onDelete, onUpdate, height }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleUpdate = (id) => {
    onUpdate(id);
  };

  return (
    <Paper
      sx={{ maxWidth: "97%", overflow: "hidden", border: "1px solid #d7d7d7" }}
    >
      <TableContainer sx={{ maxHeight: height }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column, colIndex) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={colIndex} align={column.align}>
                        {column.format && typeof value === "number" ? (
                          column.format(value)
                        ) : column.id === "img" ? (
                          <img
                            src={value}
                            alt="Image"
                            style={{ width: "100px", height: "100px" }}
                          />
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleUpdate(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      minWidth: PropTypes.number,
      align: PropTypes.oneOf(["left", "right", "center"]),
      format: PropTypes.func,
    })
  ).isRequired,
  rows: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  height: PropTypes.number,
};

export default DataTable;
