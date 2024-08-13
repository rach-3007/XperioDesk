import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <Box className={styles.footer}>
      <Box className={styles.footerContent}>
        <Box className={styles.section}>
          <Typography variant="h6" className={styles.sectionTitle}>
            Contact Us
          </Typography>
          <Typography className={styles.text}>
            Email: contact@xperio.com
          </Typography>
          <Typography className={styles.text}>Phone: +123 456 7890</Typography>
        </Box>
        <Box className={styles.section}>
          <Typography variant="h6" className={styles.sectionTitle}>
            Follow Us
          </Typography>
          <Box className={styles.socialIcons}>
            <IconButton href="https://www.facebook.com" target="_blank">
              <Facebook />
            </IconButton>
            <IconButton href="https://www.twitter.com" target="_blank">
              <Twitter />
            </IconButton>
            <IconButton href="https://www.linkedin.com" target="_blank">
              <LinkedIn />
            </IconButton>
            <IconButton href="https://www.instagram.com" target="_blank">
              <Instagram />
            </IconButton>
          </Box>
        </Box>
        <Box className={styles.section}>
          <Typography variant="h6" className={styles.sectionTitle}>
            Quick Links
          </Typography>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/about" className={styles.link}>
            About Us
          </Link>
          <Link href="/services" className={styles.link}>
            Services
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
        </Box>
      </Box>
      <Box className={styles.footerBottom}>
        <Typography variant="body2" color="textSecondary">
          &copy; 2024 XperioDesk. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
