// src/pages/Dashboard.jsx
import AttendanceBarChart from '../components/AttendanceBarChart';
import GpaCalculatorCard from '../components/GPACalculatorCard';
import SmartAlerts from '../components/SmartAlerts';
import SummaryCards from '../components/SummaryCards';
import TodayTimetable from '../components/TodayTimetable';
import UpcomingFeatures from '../components/UpcomingFeatures';


const Dashboard = () => {
  return (
    <div className="space-y-10">
      <SummaryCards />

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
        <TodayTimetable />
        <SmartAlerts />
      {/* </div> */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-4">
          <AttendanceBarChart />
        </div>
        <GpaCalculatorCard/>
        
      </div>
    <UpcomingFeatures />
    </div>
  );
};


export default Dashboard;


