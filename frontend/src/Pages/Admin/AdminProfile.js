import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import AdminNavbar from "../../Components/Admin/Navbar/AdminNavbar";
import SideBar from "../../Components/Admin/SideBar/SideBar";
import { useSelector } from "react-redux";

function AdminProfile() {

const admin = useSelector((state)=>state.adminSignin)
const {adminInfo} = admin;

  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen ">
      <SideBar />
      <div className="flex flex-col flex-1 overflow-hidden ">
        <AdminNavbar />

        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper
                sx={{ p: 2, textAlign: "center", backgroundColor: "#f2f2f2" }}
              >
                <Typography variant="h3" sx={{ color: "#004d40" }}>
                  Admin Profile
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                  Personal Information
                </Typography>
                <Typography sx={{ marginBottom: "0.5rem" }}>
                  Name: {adminInfo.firstName + " " + adminInfo.lastName}
                </Typography>
                <Typography sx={{ marginBottom: "0.5rem" }}>
                  Email: {adminInfo.email}
                </Typography>
                <Typography>Phone: (+91) {adminInfo.mobileno}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                  Account Information
                </Typography>
                <Typography sx={{ marginBottom: "0.5rem" }}>
                  Username: {adminInfo.email}
                </Typography>
                <Typography sx={{ marginBottom: "0.5rem" }}>
                  Password: *********
                </Typography>
                <Typography>Last Login: 04/17/2023 10:30 AM</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <img
                    src={adminInfo.pic}
                    alt="Admin Profile"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default AdminProfile;
