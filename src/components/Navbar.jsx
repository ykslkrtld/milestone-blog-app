import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import useAuthCalls from "../services/useAuthCalls";
import useBlogCalls from "../services/useBlogCalls";
import avatar from "../assets/avatar.png"
import { useEffect } from 'react'
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const pages = [
  { name: "Dashboard", path: "/" },
  { name: "New Blog", path: "/new-blog" },
  { name: "About", path: "/about" },
];

const settings = [
  { name: "My Blogs", path: "/my-blogs" },
  { name: "Profile", path: "/profile" },
  { name: "Logout", path: "/" },
];

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuthCalls();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { getUsers } = useBlogCalls()
  const { users } = useSelector((state) => state.getBlog);
  console.log(users)

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

  const handleUserMenuClick = (setting) => {
    if (setting.name === "Logout") {
      logout();
    }
    handleCloseUserMenu();
  };

    useEffect(() => {
    getUsers()
  }, [])
  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink
                      to={page.path}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {page.name}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <NavLink
                  to={page.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {page.name}
                </NavLink>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <div style={{display:"flex", alignItems:"center", gap:10}}>
            <Typography>
              {user && users[0]?.firstName}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={user ? users[0]?.image : avatar }
                />
              </IconButton>
            </Tooltip>
            </div>
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
              {user ? (
                settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => handleUserMenuClick(setting)}
                  >
                    <NavLink
                      to={setting.path}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography textAlign="center">{setting.name}</Typography>
                    </NavLink>
                  </MenuItem>
                ))
              ) : (
                <MenuItem onClick={handleCloseUserMenu}>
                  <NavLink
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography textAlign="center">Login</Typography>
                  </NavLink>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
