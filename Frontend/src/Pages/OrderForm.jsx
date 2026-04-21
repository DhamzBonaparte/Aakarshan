import {
  Box,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Select,
  Button,
  Container,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { CloudUploadOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import "../Styles/OrderForm.scss";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { useEffect } from "react";
import axios from "axios";

export const OrderForm = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    // Triggers the hidden file input
    fileInputRef.current.click();
  };

  const handleCustomFormSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^(97|98)[0-9]{8}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!phoneRegex.test(phone)) {
      Swal.fire(
        "Invalid phone number",
        "Please enter a valid number.",
        "error",
      );
      return;
    }
    if (!emailRegex.test(email)) {
      Swal.fire(
        "Invalid email address",
        "Please enter a valid email.",
        "error",
      );
      return;
    }
    if (!selectedFile) {
      Swal.fire(
        "No file uploaded",
        "Please upload a file before submitting.",
        "warning",
      );
      return;
    }

    const id = localStorage.getItem("visitorId");

    // Confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to place this custom order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return; // stop if user cancels

    try {
      const formData = new FormData();
      formData.append("designFile", selectedFile);
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("landmarks", landmarks);
      formData.append("canvasSize", canvasSize);
      formData.append("material", material);
      formData.append("paymentMethod", paymentMethod);
      formData.append("price", amount);
      formData.append("visitorId", id);

      const { data } = await axios.post(
        "http://localhost:3000/api/v1/custom-order",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      console.log("Submitting order:", data);

      // Success alert
      await Swal.fire(
        "Success!",
        "Your custom order has been placed.",
        "success",
      );

      // Clear form data after success
      setFullName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setLandmarks("");
      setCanvasSize("");
      setMaterial("");
      setPaymentMethod("");
      setAmount("");
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        "Something went wrong while submitting your order.",
        "error",
      );
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      console.log("Selected file:", file.name);
    }
  };

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmarks, setLandmarks] = useState("");
  const [canvasSize, setCanvasSize] = useState("");
  const [material, setMaterial] = useState("Canvas"); // default option
  const [paymentMethod, setPaymentMethod] = useState("eSewa");
  const [designFile, setDesignFile] = useState(null);
  const [amount, setAmount] = useState(0);

  const sizePrices = {
    "12x18": 1500,
    "18x24": 2500,
    "24x36": 4000,
    "36x48": 6000,
  };

  const handleSizeChange = (e) => {
    const selected = e.target.value;
    setCanvasSize(selected);
    setAmount(sizePrices[selected] || 0);
  };

  return (
    <>
      <Navbar />
      <form onSubmit={(e) => handleCustomFormSubmit(e)}>
        <Box component="section" className="order-section">
          <Container maxWidth="md" className="order-container">
            <Box className="form-header">
              <Typography variant="h4" component="h2">
                Create Your Custom Canvas
              </Typography>
              <Typography variant="body1">
                Turn your favorite photos or artwork into stunning canvas
                prints. Choose your size, material, and we'll handle the rest.
              </Typography>
            </Box>

            <Box className="form-card">
              {/* spacing={2} helps keep the layout tight for a 2-column grid */}
              <Grid container spacing={2} className="order-form-grid">
                {/* Full Name */}
                <Grid item xs={12} sm={6}>
                  <label className="input-label">Full Name</label>
                  <TextField
                    type="text"
                    fullWidth
                    placeholder="Your name"
                    variant="outlined"
                    value={fullName}
                    required
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Grid>

                {/* Email */}
                <Grid item xs={12} sm={6}>
                  <label className="input-label">Email</label>
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="your@email.com"
                    variant="outlined"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    inputProps={{
                      pattern:
                        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                      title:
                        "Please enter a valid email address (e.g. your@email.com)",
                    }}
                  />
                </Grid>

                {/* Phone */}
                <Grid item xs={12} sm={6}>
                  <label className="input-label">Phone</label>
                  <TextField
                    type="text"
                    fullWidth
                    required
                    placeholder="+977 98xxxxxxxx"
                    variant="outlined"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputProps={{
                      pattern: "^(97|98)[0-9]{8}$",
                      title:
                        "Phone number must start with 97 or 98 and be exactly 10 digits",
                    }}
                  />
                </Grid>

                {/* City */}
                <Grid item xs={12} sm={6}>
                  <label className="input-label">Address</label>
                  <TextField
                    fullWidth
                    type="text"
                    required
                    placeholder="Kathmandu"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>

                {/* Street Address - Kept as full width (xs=12) to match image layout */}
                <Grid item xs={12}>
                  <label className="input-label">Near Landmarks</label>
                  <TextField
                    type="text"
                    fullWidth
                    required
                    placeholder="Street address"
                    variant="outlined"
                    value={landmarks}
                    onChange={(e) => setLandmarks(e.target.value)}
                  />
                </Grid>

                {/* Canvas Size */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <label className="input-label">Canvas Size</label>
                    <Select
                      fullWidth
                      value={canvasSize}
                      onChange={handleSizeChange}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select a size
                      </MenuItem>
                      {Object.keys(sizePrices).map((size) => (
                        <MenuItem key={size} value={size}>
                          {size} inches
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "16px",
                        textAlign: "center",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <Typography variant="h6">Amount</Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", color: "#1cd219" }}
                      >
                        {amount > 0 ? `NPR ${amount}` : "Please select a size"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Material Dropdown */}
                <Grid item xs={12} sm={6}>
                  <label className="input-label">Material</label>
                  <Select
                    fullWidth
                    defaultValue="Canvas"
                    onChange={(e) => setMaterial(e.target.value)}
                  >
                    <MenuItem value="Canvas">Canvas</MenuItem>
                    <MenuItem value="Poster">Matte Poster</MenuItem>
                    <MenuItem value="Framed">Framed Print</MenuItem>
                  </Select>
                </Grid>

                {/* Payment Method Dropdown */}
                <Grid item xs={12} sm={6}>
                  <label className="input-label">Payment Method</label>
                  <Select
                    fullWidth
                    defaultValue="eSewa"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <MenuItem value="eSewa">eSewa</MenuItem>
                    <MenuItem value="Khalti">Khalti</MenuItem>
                    <MenuItem value="COD">Cash on Delivery</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <label className="input-label">Upload Your Design</label>

                  {/* Hidden File Input */}
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />

                  <Box
                    className="upload-box"
                    onClick={handleBoxClick}
                    sx={{
                      cursor: "pointer",
                      border: "2px dashed #ccc",
                      padding: "20px",
                      textAlign: "center",
                      "&:hover": { backgroundColor: "#f9f9f9" },
                    }}
                  >
                    <Typography className="upload-text">
                      <CloudUploadOutlined />
                      {selectedFile
                        ? `Selected: ${selectedFile.name}`
                        : "Click to upload your artwork"}
                    </Typography>

                    {/* Show preview if available */}
                    {previewUrl && (
                      <Box sx={{ mt: 2 }}>
                        <img
                          src={previewUrl}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                            borderRadius: "8px",
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12} className="submit-button-grid">
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    className="submit-btn"
                  >
                    Submit Custom Order
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </form>
      <Footer></Footer>
    </>
  );
};
