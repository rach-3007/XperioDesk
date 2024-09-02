import React, { useState } from 'react';
import DashboardOverview from './DashboardOverview';
import { TabType } from './types/index';

const DashboardOverviewHandler: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [location, setLocation] = useState<string>('Techno Park Phase I - Gayathri Building');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleLocationChange = (location: string) => {
    setLocation(location);
  };

  return (
    <DashboardOverview
      location={location}
      activeTab={activeTab}
      onTabChange={(tabOrLocation) => {
        if (['overview', 'seat-occupancy', 'booking-utilization'].includes(tabOrLocation)) {
          handleTabChange(tabOrLocation as TabType);
        } else {
          handleLocationChange(tabOrLocation);
        }
      }}
    />
  );
};

export default DashboardOverviewHandler;
