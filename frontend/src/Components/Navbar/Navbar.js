import * as React from "react";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "./Logo.png";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userLogout } from "../../Redux/Users/UserSigninSlice";
const pages = ["Home", "Services", "Become A Service Provider"];
const links = ["/", "/services", "/BecomeProvider"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isuser, setIsUser] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const userAccount = () => {
    navigate("/userProfile");
  };

  const loginPage = () => {
    navigate("/signin");
  };

  const dispatch = useDispatch();
  const logoutFunction = (e) => {
    e.preventDefault();

    dispatch(userLogout());
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  useEffect(() => {
    if (userInfo) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [userInfo]);
  return (
    <>
      <AppBar
        position="sticky"
        style={{ background: "transparent" }}
        sx={{
          opacity: "0.8",
          height: "4rem",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/">
              <Box
                component="img"
                alt="Your logo."
                src={Logo}
                sx={{
                  height: "3rem",
                  width: "10rem",
                  display: { xs: "none", md: "flex" },
                  ml: 17,
                }}
              />
            </Link>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                flexGrow: 1,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            ></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link key={index} to={`${links[index]}`}>
                      <Typography textAlign="center">{page}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Link to="/">
              <Box
                component="img"
                sx={{
                  height: { xs: 35, md: 35 },
                  width: { xs: 70, md: 50 },
                  display: { xs: "flex", md: "none" },
                }}
                alt="Your logo."
                src={Logo}
              />
            </Link>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            ></Typography>
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Link key={index} to={`${links[index]}`}>
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "black",

                      display: "block",
                      fontWeight: "Bold",
                      mx: 2,
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            {isuser ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={userInfo.pic} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Button
                    sx={{
                      fontWeight: "Bold",
                      color: "Black",
                      "&:hover": {
                        backgroundColor: " #D3D3D3",
                        color: "#3c52b2",
                      },
                    }}
                    textAlign="center"
                    onClick={userAccount}
                  >
                    Account
                  </Button>

                  <Button
                    sx={{
                      fontWeight: "Bold",
                      color: "Black",
                      "&:hover": {
                        backgroundColor: "#FFCCCB",
                        color: "#3c52b2",
                      },
                    }}
                    textAlign="center"
                    onClick={logoutFunction}
                  >
                    Logout
                  </Button>
                </Menu>
              </Box>
            ) : (
              <Box>
                <Button
                  onClick={loginPage}
                  variant="outlined"
                  sx={{ color: "green", borderColor: "green" }}
                >
                  {" LogIn "}
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
