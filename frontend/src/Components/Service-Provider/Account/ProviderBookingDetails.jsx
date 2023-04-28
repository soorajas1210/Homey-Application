import React, { useState } from 'react'
import CompletedServices from './CompletedServices';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


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
import Typography from "@mui/material/Typography";
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


import { Button, Chip } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { providerbookedList } from '../../../actions/userActions';
import { providerBookingHandler } from '../../../actions/servicesActions';


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
        id: "pic",
        numeric: false,
        disablePadding: false,
        label: " image",
    },
    {
        id: "name",
        numeric: true,
        disablePadding: false,
        label: "SERVICE PROVIDER NAME",
    },
    {
        id: "dateOfBooking",
        numeric: true,
        disablePadding: false,
        label: "DATE OF BOOKING",
    },
    {
        id: "dateOfService",
        numeric: true,
        disablePadding: false,
        label: "DATE OF SERVICE",
    },
    {
        id: "status",
        numeric: true,
        disablePadding: false,
        label: "STATUS",
    },
    {
        id: "Actions",
        numeric: true,
        disablePadding: false,
        label: "ACTION",
    },
];

function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
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
                    Your Bookings
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

function ProviderBookingDetails() {
    const dispatch = useDispatch()
    const [upcoming, setUpcoming] = useState(true);
    const [previous, setPrevious] = useState(false);

    // start
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // const [user, setUser] = useState("");

    const navigate = useNavigate();

    const List = useSelector((state) => state.providerList);
    const { loading, provider, error } = List;

    const adminLogin = useSelector((state) => state.adminSignin);

    const {
        adminInfo: { isAdmin },
    } = adminLogin;

    const adminProviderBlock = useSelector((state) => state.providerBlock);

    const { user } = adminProviderBlock;


    const onClickHandler = (id, status) => {
        confirmAlert({
            title: "Confirm",
            message: `Are you sure you need to ${status === "Accepted" ? `Accept` : `Reject`
                } the booking ?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        dispatch(providerBookingHandler(id, status));
                        dispatch(providerbookedList());
                    },
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    };

    const onClickDetails = (id) => {
        navigate(`/serviceProvider/serviceDetails/${id}`)
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = providerBooked.map((n) => n.name);
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

    const bookingList = useSelector((state) => state.providerBookedList);
    const { providerBooked } = bookingList;

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - providerBooked.length) : 0;

    //  end

    useEffect(() => {
        dispatch(providerbookedList());
    }, [dispatch]);

    function newDetails() {
        setUpcoming(true);
        setPrevious(false);
    }

    function oldDetails() {
        setPrevious(true);
        setUpcoming(false);
    }

    function newDetails() {
        setUpcoming(true);
        setPrevious(false);
    }

    function oldDetails() {
        setPrevious(true);
        setUpcoming(false);
    }
    return (
        <>
            <div class="flex justify-center mt-5 space-x-2">
                <button
                    onClick={newDetails}
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    class="inline-block bg-green-400 rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-semibold uppercase leading-normal text-blue-900 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                >
                    Booking Requests
                </button>
                <button
                    onClick={oldDetails}
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    class="inline-block bg-red-200 rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-semibold uppercase leading-normal text-pink-900 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                >
                    Completed Services
                </button>
            </div>

            {upcoming && (
                <Box sx={{ width: "100%", paddingX: 5 }}>
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
                                    rowCount={providerBooked.length}
                                />
                                {!loading && !error && (
                                    <TableBody>
                                        {stableSort(providerBooked, getComparator(order, orderBy))
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((user, index) => {
                                                const isItemSelected = isSelected(
                                                    user.userId.firstName
                                                );
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        // onClick={(event) => handleClick(event, row.firstName)}

                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={user._id}
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
                                                                    height: "5rem",
                                                                    width: "5 rem",
                                                                    borderRadius: "50%",
                                                                }}
                                                                alt="The house from the offer."
                                                                src={user.userId.pic}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {user.userId.firstName}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {new Date(user.createdAt).toLocaleDateString(
                                                                "en-GB",
                                                                {
                                                                    day: "2-digit",
                                                                    month: "2-digit",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {user.serviceDate}
                                                        </TableCell>
                                                        <TableCell align="right"> <Chip label={user.status} variant="outlined" /></TableCell>
                                                        {user.status === "booked" ? (

                                                            <TableCell align="right" sx={{ gap: 2, display: "grid" }} >
                                                                <Button
                                                                    variant="outlined"
                                                                    sx={{ color: "#05630a" }}
                                                                    onClick={async () => {
                                                                        // setUser(user.firstName);
                                                                        onClickHandler(
                                                                            user._id,
                                                                            "Accepted"
                                                                        );
                                                                    }}
                                                                >
                                                                    {"Accept"}
                                                                </Button>
                                                                <Button
                                                                    variant="outlined"
                                                                    sx={{ color: "#990606" }}
                                                                    onClick={async () => {
                                                                        // setUser(user.firstName);
                                                                        onClickHandler(
                                                                            user._id,
                                                                            "Rejected"
                                                                        );
                                                                    }}
                                                                >
                                                                    {"Reject"}
                                                                </Button>
                                                            </TableCell>) : (
                                                            <TableCell align="right"  >
                                                                <Button
                                                                    variant="outlined"
                                                                    sx={{ color: "#0f4a74" }}
                                                                    onClick={async () => {
                                                                        // setUser(user.firstName);
                                                                        onClickDetails(
                                                                            user._id,

                                                                        );
                                                                    }}
                                                                >
                                                                    {"Details"}
                                                                </Button>


                                                            </TableCell>
                                                        )}
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
                            count={providerBooked.length}
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
                </Box >
            )
            }
            {
                previous && (
                    <CompletedServices />
                )
            }
        </>
    )
}

export default ProviderBookingDetails

