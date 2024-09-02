import React from 'react';
import { DashboardOverviewProps } from './types/index';
import styles from './DashboardOverview.module.css';

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ location, activeTab, onTabChange }) => {
  return (
    <div className={styles.tabContent}>
      <header className={styles.dashboardHeader}>
        <h1>Dashboard</h1>
        <select className={styles.locationChooser} value={location} onChange={(e) => onTabChange(e.target.value)}>
          <option value="Techno Park Phase I - Gayathri Building">Techno Park Phase I - Gayathri Building</option>
          <option value="Techno Park Phase I - Thejaswini Building">Techno Park Phase I - Thejaswini Building</option>
        </select>
      </header>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => onTabChange('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'seat-occupancy' ? styles.active : ''}`}
          onClick={() => onTabChange('seat-occupancy')}
        >
          Seat Occupancy
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'booking-utilization' ? styles.active : ''}`}
          onClick={() => onTabChange('booking-utilization')}
        >
          Booking and Utilization
        </button>
      </div>
      <div className={styles.tabContent}>
        {/* {activeTab === 'overview' && <Overview location={location} />} */}
        {/* {activeTab === 'seat-occupancy' && <SeatOccupancy location={location} />} */}
        {/* {activeTab === 'booking-utilization' && <BookingUtilization location={location} />} */}
      </div>
    </div>
  );
};

export default DashboardOverview;
