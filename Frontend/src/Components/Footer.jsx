import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import "../Styles/Footer.scss";

export const Footer = () => {
  return (
    <Box component="footer" className="footer-section">
      <Container maxWidth="lg" className="footer-container">
        {" "}
        {/* Using lg for a wider spread */}
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          justifyContent="space-between"
        >
          {/* Brand Identity */}
          <Grid item xs={12} md={3}>
            <Box className="footer-column brand-column">
              <Typography variant="h6" className="footer-logo">
                Aakarshan
              </Typography>
              <Typography variant="body2" className="footer-tagline">
                Premium canvas art for your space
              </Typography>
            </Box>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={6} justifyContent="flex-end">
              {/* Shop */}
              <Grid item xs={6} sm={4}>
                <Box className="footer-column">
                  <Typography variant="subtitle1" className="column-title">
                    Shop
                  </Typography>
                  <ul className="footer-links">
                    <li>
                      <a href="/ready-made">Browse Designs</a>
                    </li>
                    <li>
                      <a href="/custom-order">Custom Order</a>
                    </li>
                  </ul>
                </Box>
              </Grid>

              {/* Support */}
              <Grid item xs={6} sm={4}>
                <Box className="footer-column">
                  <Typography variant="subtitle1" className="column-title">
                    Support
                  </Typography>
                  <ul className="footer-links">
                    <li>
                      <a href="/contact">Contact</a>
                    </li>
                    <li>
                      <a href="/shipping">Shipping</a>
                    </li>
                    <li>
                      <a href="/returns">Returns</a>
                    </li>
                  </ul>
                </Box>
              </Grid>

              {/* Connect */}
              <Grid item xs={6} sm={4}>
                <Box className="footer-column">
                  <Typography variant="subtitle1" className="column-title">
                    Connect
                  </Typography>
                  <ul className="footer-links">
                    <li>
                      <a href="https://facebook.com">Facebook</a>
                    </li>
                    <li>
                      <a href="https://instagram.com">Instagram</a>
                    </li>
                  </ul>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box className="footer-divider" />
        <Box className="footer-bottom">
          <Typography variant="body2">
            © 2026 Aakarshan. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
