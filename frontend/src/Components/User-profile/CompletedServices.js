import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";

function CompletedServices() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();

  const bookingList = useSelector((state) => state.userbookedList);
  const { userBooked } = bookingList;

  console.log("from completed store", userBooked);

  const columns = [
    { id: "customer", label: "SERVICE PROVIDER NAME", minWidth: 100 },
    {
      id: "serviceCat",
      label: "SERVICE NAME",
      minWidth: 170,
    },
    { id: "provider", label: "DATE OF BOOKING", minWidth: 100 },
    {
      id: "service",
      label: "DATE OF SERVICE",
      minWidth: 170,
      align: "right",
    },
    {
      id: "amount",
      label: "STATUS",
      minWidth: 170,
      align: "right",
    },
  ];

  function createData(customer, serviceCat, provider, service, amount) {
    return { customer, serviceCat, provider, service, amount };
  }

  const rows = userBooked
    .filter((item) => item.status === "payed")
    .map((user) => {
      return createData(
        user.firstName + " " + user.lastName,
        user.serviceCategory,
        new Date(user.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        user.serviceDate,
        user.status
      );
    });

  console.log("rows", rows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <Typography sx={{ fontSize: 22, fontWeight: 300, p: 2 }}>
        Completed Services
      </Typography>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table
          sx={{ backgroundColor: "#fff" }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#F3F4F6",
                    color: "#374151",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.amoount}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ fontSize: "14px", color: "#6B7280" }}
                        >
                          {value}
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
        sx={{ backgroundColor: "#F3F4F6", borderTop: "1px solid #E5E7EB" }}
      />
    </Paper>
  );
}

export default CompletedServices;
