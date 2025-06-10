// src/pages/Dashboard.jsx
import AttendanceBarChart from '../components/AttendanceBarChart';
import SmartAlerts from '../components/SmartAlerts';
import SummaryCards from '../components/SummaryCards';
import TodayTimetable from '../components/TodayTimetable';
import UpcomingFeatures from '../components/UpcomingFeatures';


const Dashboard = () => {
  return (
    <div className="space-y-10">
      <SummaryCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TodayTimetable />
        <SmartAlerts />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <AttendanceBarChart />
        </div>
        <UpcomingFeatures />
      </div>

    </div>
  );
};


export default Dashboard;


