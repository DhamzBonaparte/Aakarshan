import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Drawer,
  Box,
} from "@mui/material";
import {
  ShoppingBagOutlined,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import "../Styles/Header.scss";

export const Navbar = ({ cartCount = 0 }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { label: "Browse Designs", path: "/catalog" },
    { label: "Custom Order", path: "/custom" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <AppBar position="sticky" className="header-container">
        <Toolbar className="toolbar">
          <Typography
            variant="h6"
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Aakarshan
          </Typography>

          {/* Desktop Navigation */}
          <Box className="nav-links">
            {navItems.map((item) => (
              <Typography
                key={item.label}
                className="nav-link"
                onClick={() => navigate(item.path)}
                style={{ cursor: "pointer" }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          {/* Actions */}
          <Box className="actions" >
            <IconButton className="cart-icon" onClick={() => navigate("/checkout")}>
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingBagOutlined  />
              </Badge>
            </IconButton>

            <IconButton
              className="menu-button"
              onClick={toggleDrawer}
              edge="end"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true, disableScrollLock: true }}
      >
        <Box className="mobile-drawer">
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          {navItems.map((item) => (
            <Typography
              key={item.label}
              className="drawer-link"
              onClick={() => {
                navigate(item.path);
                toggleDrawer();
              }}
              style={{ cursor: "pointer" }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>
      </Drawer>
    </>
  );
};
