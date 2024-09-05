import React from "react";
import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import styles from "./NavBar.module.css";

const NavBar: React.FC = () => {
  const username = localStorage.getItem("name") || "User";
  

  

  return (
    <header className={styles.navbar}>
      <span className={styles.logo}>XperioDesk</span>
      <div className={styles.navbarRight}>
        <Link className={styles.navLink} to="/">
          Home
        </Link>
        <Link className={styles.navLink} to={"/user/bookings"}>
          My Bookings
        </Link>
        <div className={styles.profile}>
          <span className={styles.username}>{username}</span>
          <AccountCircle className={styles.profileIcon} />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
