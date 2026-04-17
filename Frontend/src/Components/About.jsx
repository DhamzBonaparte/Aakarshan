import React from "react";
import { Box, Typography, Container, Stack } from "@mui/material";
import "../Styles/About.scss";

export const About = () => {
  return (
    <Box component="section" className="about-section shadow-box">
      <Container maxWidth="lg">
        <Box className="about-content">
          <Typography variant="h5" component="h2">
            About Aakarshan
          </Typography>

          <Typography variant="body1" className="about-description">
            Aakarshan brings art to life through premium canvas printing.
            Whether you choose from our ready-made collection or create
            something uniquely yours, we ensure every piece is crafted with care
            and delivered to transform your space.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          className="feature-pills"
          spacing={2}
        >
          <Box className="pill">
            Payment via <span>eSewa & Khalti</span>
          </Box>
          <Box className="pill">
            Delivery across <span>Nepal</span>
          </Box>
          <Box className="pill">
            Quality <span>Guaranteed</span>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
