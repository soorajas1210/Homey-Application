import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    Divider,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ThemeProvider,
    createTheme,
    Stepper
} from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Invoice, bookedServiceDetails } from "../../actions/servicesActions";

const theme = createTheme();

function ProviderServiceDetails() {

    const dispatch = useDispatch()
    const { id } = useParams()
    const [invoice, setInvoice] = useState(false);
    const [email, setEmail] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [amount, setAmount] = useState("");
    const [workHours, setWorkHours] = useState(0);
    const [description, setDescription] = useState("");



    useEffect(() => {
        dispatch(bookedServiceDetails(id))
    }, [dispatch, id])

    const details = useSelector((state) => state.providerBookedDetails)
    const { providerBookedDetails } = details
    const handleComplete = () => {
        setInvoice(true)
    }
    const userId = providerBookedDetails?.userId._id
    const providerId = providerBookedDetails?.providerId._id
    const bookedId = providerBookedDetails?._id
    const newData = {
        bookedId, email, serviceType, amount, workHours, description, userId, providerId

    }

    const sendInvoice = (e) => {
        e.preventDefault()
        setAmount(providerBookedDetails?.providerId.serviceCharge * workHours);

        console.log(newData)

        dispatch(Invoice(newData));

    }

    return (
        <>
            <Navbar />
            <ThemeProvider theme={theme}>
                <Box padding={3} sx={{ mt: 5 }}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item sx={{ display: "flex", justifyItems: "center", justifyContent: "center" }} >
                            <Typography variant="h3" gutterBottom className="font-bold text-green-900" >
                                Booking Details
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Paper>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>

                                        <Typography variant="subtitle1">
                                            Service Type: <strong>{providerBookedDetails?.serviceId.serviceName}</strong>
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Booking Date: <strong>{providerBookedDetails?.serviceDate}</strong>
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Booking Time: <strong>{providerBookedDetails?.serviceTime}</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">
                                            Customer Name: <strong>{providerBookedDetails?.userId.firstName + " " + providerBookedDetails?.userId.lastName}</strong>
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Customer Email:{""}
                                            <strong>
                                                <a href="providerBookedDetails.email">{providerBookedDetails?.email}</a>
                                            </strong>
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Customer Phone: <strong>{providerBookedDetails?.phoneNumber}</strong>
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Customer Address: <strong>{providerBookedDetails?.streetAddress + ", " + providerBookedDetails?.city + ", " + providerBookedDetails?.state}</strong>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item sx={{ display: "flex", gap: 2 }}>
                            <Button variant="contained" color="primary" aria-label="Accept" onClick={handleComplete}>
                                Completed
                            </Button>
                            <Button variant="contained" color="secondary" aria-label="Reject">
                                Cancel
                            </Button>
                        </Grid>

                        {invoice && (<Grid item bgcolor="#f9f9f9" padding={2}>
                            <Typography variant="h6">Send Invoice</Typography>
                            <Grid container spacing={2} component="form" onSubmit={sendInvoice} >
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="invoice-email"
                                        label="Customer Email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        aria-label="Customer Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl variant="outlined" fullWidth margin="normal">
                                        <InputLabel id="service-select-label">Service Type</InputLabel>
                                        <Select
                                            labelId="service-select-label"
                                            id="service-select"
                                            label="Service Type"
                                            value={serviceType}
                                            onChange={(e) => setServiceType(e.target.value)}
                                        >
                                            <MenuItem value={providerBookedDetails?.serviceId.serviceName}>
                                                <em>{providerBookedDetails?.serviceId.serviceName}</em>
                                            </MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl variant="outlined" fullWidth margin="normal">
                                        <InputLabel id="service-workHours">Work Hours</InputLabel>
                                        <Select
                                            labelId="service-workHours"
                                            id="service-workHours"
                                            label="Work Hours"
                                            value={workHours}
                                            onChange={(e) => setWorkHours(e.target.value)}
                                        >
                                            <MenuItem value={1}>
                                                <em>{"1"}</em>
                                            </MenuItem>
                                            <MenuItem value={2}>
                                                <em>{"2"}</em>
                                            </MenuItem>
                                            <MenuItem value={3}>
                                                <em>{"3"}</em>
                                            </MenuItem>
                                            <MenuItem value={4}> <em>{"4"}</em></MenuItem>
                                            <MenuItem value={5}> <em>{"5"}</em></MenuItem>
                                            <MenuItem value={6}> <em>{"6"}</em></MenuItem>
                                            <MenuItem value={7}> <em>{"7"}</em></MenuItem>
                                            <MenuItem value={8}> <em>{"8"}</em></MenuItem>
                                            <MenuItem value={9}> <em>{"9"}</em></MenuItem>
                                            <MenuItem value={10}> <em>{"10"}</em></MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box
                                        sx={{
                                            mt: 2,
                                            border: '1px solid grey',
                                            height: '71%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '4px',
                                            fontSize: "30px",


                                        }}
                                        value={amount}

                                    >
                                        {providerBookedDetails?.providerId.serviceCharge * workHours + " Rs"}
                                    </Box>

                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        id="invoice-description"
                                        label="Description"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        aria-label="Description"
                                        multiline
                                        rows={4}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" aria-label="Send Invoice" type="submit" >
                                        Send Invoice
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>)}
                    </Grid>
                </Box>
            </ThemeProvider>
            <Footer />
        </>
    );
}
export default ProviderServiceDetails;