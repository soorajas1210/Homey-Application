import React, { useEffect, useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  blockUserAction,
  sList,
  sTypeList,
  usersList,
} from "../../../actions/adminActions";

import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";

import Paper from "@mui/material/Paper";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/alert";

import { useNavigate } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";



import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    boxShadow: "0 8px 16px -8px rgba(0,0,0,0.4)",
    borderRadius: 12,
    overflow: "hidden",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  media: {
    height: 200,
    objectFit: "cover",
  },
  content: {
    padding: "24px 16px",
  },
});
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "image",
    numeric: false,
    disablePadding: false,
    label: " image",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Service Type",
  },
  {
    id: "Service",
    numeric: true,
    disablePadding: false,
    label: "Service",
  },
  {
    id: "Description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "Actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Typography variant="h7" component="span" color="textsecondary">
            {"Sl.No"}
          </Typography>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Services
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function ServicesTables() {
  const classes = useStyles();
  const [state, setState] = useState(false);

  const dispatch = useDispatch();

  const typeList = useSelector((state) => state.serviceTypeList);
  const { serviceType } = typeList;

  const serviceList = useSelector((state) => state.servicesList);
  const { services, loading, error } = serviceList;

  useEffect(() => {
    dispatch(sTypeList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(sList());
  }, [dispatch]);

  // COPIED
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [user, setUser] = useState("");
  const navigate = useNavigate();

  const adminLogin = useSelector((state) => state.adminSignin);

  const {
    adminInfo: { isAdmin },
  } = adminLogin;

  const adminUserBlock = useSelector((state) => state.userBlock);

  const { success: successBlock } = adminUserBlock;

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin");
    }
    dispatch(usersList());
  }, [isAdmin, successBlock, dispatch]);

  const BlockHandler = (id, status, user) => {
    confirmAlert({
      title: "Confirm",
      message: `Are you sure you need to ${
        status === false ? `Block` : `Unblock`
      } ${user} ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(blockUserAction(id, status));
            // navigate("/admin");
          },
        },
        {
          label: "No",
          onClick: () => navigate("/admin/customers"),
        },
      ],
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = services.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - services.length) : 0;

  return (
    <div className="mt-10 p:10 ">
      <div className=" flex gap-7 text-center p-4 ml-6">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setState(false)}
        >
          Service Types
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setState(true)}
        >
          Services
        </Button>
      </div>
      <div>
        {!state ? (
          <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {serviceType &&
              serviceType.map((service) => (
                // <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                //   <CardMedia
                //     component="img"
                //     alt="green iguana"
                //     sx={{ width: "100%", height: 200 }}
                //     image={service.image}
                //   />
                //   <CardContent>
                //     <Typography gutterBottom variant="h5" component="div">
                //       {service.serviceType}
                //     </Typography>
                //     <Typography variant="body2" color="text.secondary">
                //       {service.serviceTypeDescription}
                //     </Typography>
                //   </CardContent>
                //   <CardActions>
                //     <Button size="small">Edit</Button>
                //     <Button size="small">Delete</Button>
                //   </CardActions>
                // </Card>
                <Box className={classes.card}>
                  <CardMedia
                    component="img"
                    alt={service.serviceType}
                    image={service.image}
                    className={classes.media}
                  />
                  <Box className={classes.content}>
                    <Typography variant="h5" component="h2">
                      {service.serviceType}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {service.serviceTypeDescription}
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="flex-end">
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                      <Button size="small" color="secondary">
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
          </div>
        ) : (
          <Box
            sx={{
              paddingX: 5,
              width: "100%",
            }}
          >
            <Paper sx={{ width: "100%", mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} />
              {loading && <CircularProgress />}
              {error && <Alert variant="danger">{error}</Alert>}
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={services.length}
                  />
                  {!loading && !error && (
                    <TableBody>
                      {stableSort(services, getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((user, index) => {
                          const isItemSelected = isSelected(user.firstName);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              // onClick={(event) => handleClick(event, row.firstName)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={user.serviceType}
                              selected={isItemSelected}
                            >
                              <TableCell>
                                <Typography
                                  variant="h6"
                                  component="span"
                                  color="secondary"
                                >
                                  {index + 1}
                                </Typography>
                              </TableCell>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="normal"
                              >
                                <Box
                                  component="img"
                                  sx={{
                                    width: "100%",
                                    height: "auto",
                                    maxWidth: "40%",
                                    borderRadius: "5%",
                                  }}
                                  alt="The house from the offer."
                                  src={user.image}
                                />
                              </TableCell>
                              <TableCell align="right">
                                {user.serviceType}
                              </TableCell>
                              <TableCell align="right">
                                {user.serviceName}
                              </TableCell>
                              <TableCell align="left" sx={{ width: 400 }}>
                                {user.serviceDescription}
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="outlined"
                                  color="error"
                                  onClick={async () => {
                                    // setUser(user.firstName);
                                    BlockHandler(
                                      user._id,
                                      !user.isVerified,
                                      user.firstName
                                    );
                                  }}
                                >
                                  {"Delete"}
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: (dense ? 33 : 53) * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={services.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </Box>
        )}
      </div>
    </div>
  );
}

export default ServicesTables;
