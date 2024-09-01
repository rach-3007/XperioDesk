export type TabType = 'overview' | 'seat-occupancy' | 'booking-utilization';

export interface DashboardOverviewProps {
  location: string;
  activeTab: TabType;
  onTabChange: (tabOrLocation: TabType | string) => void;
}



export interface DashboardOverviewHandlerProps {
  activeTab: TabType;
  location: string;
  onTabChange: (tab: TabType) => void;
  onLocationChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
