import React from "react";
import { Link } from "react-router-dom"; 
import { AccountCircle } from "@mui/icons-material"; 
import styles from "./NavBar.module.css"; 

interface NavBarProps {
  username: string;
}

const NavBar: React.FC<NavBarProps> = ({ username }) => {
  return (
    <header className={styles.navbar}>
      <span className={styles.logo}>XperioDesk</span>
      <div className={styles.navbarRight}>
        <Link className={styles.navLink} to="/">
          Home
        </Link>
        <Link className={styles.navLink} to="/admin-view-all-bookings">
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
