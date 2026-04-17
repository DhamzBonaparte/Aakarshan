import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import "../Styles/Contact.scss";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";

export function Contact() {
      useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const contactInfo = {
    email: ["contact@aakarshan.com", "orders@aakarshan.com"],
    phone: ["+977 981-2345678", "+977 982-3456789"],
    address: {
      street: "Thamel, Kathmandu 44600",
      country: "Nepal",
    },
    social: [
      { name: "Facebook", icon: FacebookIcon, url: "https://facebook.com" },
      { name: "Instagram", icon: InstagramIcon, url: "https://instagram.com" },
      { name: "WhatsApp", icon: WhatsAppIcon, url: "https://whatsapp.com" },
    ],
    businessHours: {
      weekdays: "Sunday - Friday",
      weekdayHours: "10:00 AM - 7:00 PM",
      saturday: "Saturday",
      saturdayHours: "Closed",
    },
  };

  return (
    <>
    <Navbar></Navbar>
      <div className="contact">
        <div className="contact__container">
          {/* Header */}
          <motion.div
            className="contact__header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="contact__title">Get in Touch</h1>
            <p className="contact__subtitle">
              Have questions about our canvas art? Want to discuss a custom
              order? We're here to help!
            </p>
          </motion.div>

          <div className="contact__content">
            {/* Left Column - Contact Form */}
            <motion.div
              className="contact__form-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="contact__section-title">Send us a Message</h2>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__group">
                  <label htmlFor="name" className="contact-form__label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="contact-form__input"
                    required
                  />
                </div>

                <div className="contact-form__group">
                  <label htmlFor="email" className="contact-form__label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="contact-form__input"
                    required
                  />
                </div>

                <div className="contact-form__group">
                  <label htmlFor="message" className="contact-form__label">
                    How can we help you?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your inquiry, custom order details, or any questions you have..."
                    className="contact-form__textarea"
                    rows="6"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="contact-form__submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="contact-form__spinner"></span>
                  ) : (
                    <>
                      <SendIcon className="contact-form__submit-icon" />
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <motion.div
                    className="contact-form__success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Thank you! Your message has been sent successfully.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Right Column - Contact Information */}
            <motion.div
              className="contact__info-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="contact__section-title">Contact Information</h2>

              <div className="contact-info">
                {/* Email */}
                <div className="contact-info__block">
                  <div className="contact-info__header">
                    <EmailIcon className="contact-info__icon" />
                    <h3 className="contact-info__title">Email</h3>
                  </div>
                  <div className="contact-info__content">
                    {contactInfo.email.map((email, index) => (
                      <a
                        key={index}
                        href={`mailto:${email}`}
                        className="contact-info__link"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-info__block">
                  <div className="contact-info__header">
                    <PhoneIcon className="contact-info__icon" />
                    <h3 className="contact-info__title">Phone</h3>
                  </div>
                  <div className="contact-info__content">
                    {contactInfo.phone.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="contact-info__link"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div className="contact-info__block">
                  <div className="contact-info__header">
                    <LocationOnIcon className="contact-info__icon" />
                    <h3 className="contact-info__title">Address</h3>
                  </div>
                  <div className="contact-info__content">
                    <p className="contact-info__text">
                      {contactInfo.address.street}
                    </p>
                    <p className="contact-info__text">
                      {contactInfo.address.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connect With Us */}
              <div className="connect-section">
                <h3 className="connect-section__title">Connect With Us</h3>
                <div className="connect-section__links">
                  {contactInfo.social.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="connect-section__link"
                      >
                        <Icon className="connect-section__icon" />
                        <span>{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Business Hours */}
          <motion.div
            className="contact__hours"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="business-hours">
              <div className="business-hours__header">
                <AccessTimeIcon className="business-hours__icon" />
                <h3 className="business-hours__title">Business Hours</h3>
              </div>
              <div className="business-hours__content">
                <div className="business-hours__row">
                  <span className="business-hours__day">
                    {contactInfo.businessHours.weekdays}
                  </span>
                  <span className="business-hours__time">
                    {contactInfo.businessHours.weekdayHours}
                  </span>
                </div>
                <div className="business-hours__row business-hours__row--closed">
                  <span className="business-hours__day">
                    {contactInfo.businessHours.saturday}
                  </span>
                  <span className="business-hours__time">
                    {contactInfo.businessHours.saturdayHours}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* <About></About> */}
      <Footer></Footer>
    </>
  );
}
