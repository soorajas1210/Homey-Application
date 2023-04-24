import React from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";

import AdminNavbar from "../../Components/Admin/Navbar/AdminNavbar";
import SideBar from "../../Components/Admin/SideBar/SideBar";

function Transactions() {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper
                sx={{ p: 2, textAlign: "center", backgroundColor: "#f2f2f2" }}
              >
                <Typography variant="h3" sx={{ color: "#004d40" }}>
                  Transaction
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                  Service Details
                </Typography>
                <Typography sx={{ marginBottom: "0.5rem" }}>
                  Service Type: Plumbing
                </Typography>
                <Typography sx={{ marginBottom: "0.5rem" }}>
                  Service Date: 04/20/2023
                </Typography>
                <Typography sx={{ marginBottom: "0.5rem" }}>
                  Service Time: 10:00 AM
                </Typography>
                <Typography sx={{ marginBottom: "0.5rem" }}>
                  Service Address: 123 Main St, Anytown USA
                </Typography>
                <Typography>Service Provider: John Smith</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                  Payment Details
                </Typography>
                <TextField
                  fullWidth
                  label="Card Number"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Expiration Date"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="CVV"
                  variant="outlined"
                  margin="normal"
                />
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button variant="contained" color="primary">
                Submit Payment
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Transactions;
