import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { 
  PaletteOutlined, 
  AutoAwesomeOutlined, 
  ShoppingBagOutlined 
} from '@mui/icons-material';
import '../Styles/Features.scss';
const features = [
  {
    icon: <PaletteOutlined />,
    title: 'Custom Designs',
    description: "Upload your own artwork or photo and we'll print it on premium canvas",
  },
  {
    icon: <AutoAwesomeOutlined />,
    title: 'Premium Quality',
    description: 'Museum-grade canvas and materials for lasting beauty',
  },
  {
    icon: <ShoppingBagOutlined />,
    title: 'Ready-Made Collection',
    description: 'Curated designs ready to ship in multiple sizes',
  },
];

export const Features = () => {
  return (
    <Box component="section" className="features-section">
      <Box className="features-wrapper">
        <Grid container spacing={4} justifyContent="center" className="features-grid">
          {features.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box className="feature-item">
                {/* Rounded Black Icon Box */}
                <Box className="icon-box">
                  {item.icon}
                </Box>

                {/* Content */}
                <Typography variant="h6" className="feature-title">
                  {item.title}
                </Typography>
                <Typography variant="body1" className="feature-description">
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};