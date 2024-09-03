import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AccountCircle, Menu } from "@mui/icons-material";
import styles from "./NavBar.module.css";

const NavBar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const username = localStorage.getItem("username") || "User";
  const role = localStorage.getItem("userRole") || "user";

  const bookingsPath =
    role === "admin" ? "/admin-view-all-bookings" : "/user-view-all-bookings";

  // Function to check screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize(); // Set initial value based on screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.navbar}>
      <span className={styles.logo}>XperioDesk</span>
      {isMobile ? (
        <>
          <Menu className={styles.menuIcon} onClick={toggleMenu} />
          <div
            className={`${styles.dropdownMenu} ${
              isMenuOpen ? styles.active : ""
            }`}
          >
            <Link className={styles.navLink} to="/" onClick={toggleMenu}>
              Home
            </Link>
            <Link
              className={styles.navLink}
              to={bookingsPath}
              onClick={toggleMenu}
            >
              My Bookings
            </Link>
            <div className={styles.profile}>
              <span className={styles.username}>{username}</span>
              <AccountCircle className={styles.profileIcon} />
            </div>
          </div>
        </>
      ) : (
        <div className={styles.navbarRight}>
          <Link className={styles.navLink} to="/">
            Home
          </Link>
          <Link className={styles.navLink} to={bookingsPath}>
            My Bookings
          </Link>
          <div className={styles.profile}>
            <span className={styles.username}>{username}</span>
            <AccountCircle className={styles.profileIcon} />
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
