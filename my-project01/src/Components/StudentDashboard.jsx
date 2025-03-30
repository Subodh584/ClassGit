import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Bell,
  XCircle,
  Settings,
  Calendar,
  Users,
  BookOpen,
  ChevronLeft, 
  ChevronRight, 
  Clock,
  Home,
  Book,
  MessageSquare,
  ChevronDown,
  User,
  Moon,
  LogOut,
  Search,
  Menu,
  X,
  PlusCircle,
  CheckCircle,
  FileText,
  UserPlus,
  Download,
  Check,
  Edit,
  Filter,
  AlertCircle,
  UserCheck,
} from "lucide-react";
import {
  AllCaughtUpAnimation,
  NoInvitationsAnimation,
  NoTeamsAnimation,
} from "./Animations";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

// Component for sidebar navigation with enhanced hover effects and animations
const SidebarNavItem = ({ icon, text, active, badge, onClick }) => {
  return (
    <motion.a
      href="#"
      className={`flex items-center space-x-3 px-6 py-3.5 rounded-md mx-2 ${
        active
          ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600"
          : "text-gray-700 hover:bg-gray-50"
      }`}
      title={text}
      onClick={onClick}
      whileHover={!active ? { x: 4, backgroundColor: "#f9fafb" } : {}}
      transition={{ duration: 0.2 }}
    >
      <span className={active ? "text-blue-600" : "text-gray-500"}>{icon}</span>
      <span className="font-medium">{text}</span>
      {badge && (
        <motion.span
          className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
          }}
        >
          {badge}
        </motion.span>
      )}
    </motion.a>
  );
};

// Enhanced tab button with animations
const TabButton = ({ active, onClick, icon, text, badge }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center space-x-2 py-2 px-3 relative whitespace-nowrap ${
        active
          ? "text-blue-600 font-medium"
          : "text-gray-600 hover:text-gray-800"
      }`}
      whileHover={!active ? { scale: 1.03 } : {}}
      whileTap={{ scale: 0.97 }}
    >
      <span>{icon}</span>
      <span>{text}</span>
      {badge && (
        <motion.span
          className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
          }}
        >
          {badge}
        </motion.span>
      )}
      {active && (
        <motion.span
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
          layoutId="activeTab"
          transition={{ type: "spring", damping: 20 }}
        ></motion.span>
      )}
    </motion.button>
  );
};

// Enhanced stat cards with animations
const StatCard = ({ value, label, color, icon }) => {
  const colorMap = {
    blue: "from-blue-600 to-blue-400",
    green: "from-green-600 to-green-400",
    amber: "from-amber-600 to-amber-400",
    red: "from-red-600 to-red-400",
    purple: "from-purple-600 to-purple-400",
    indigo: "from-indigo-600 to-indigo-400",
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm p-5 border border-gray-100"
      whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <motion.h4
          className="text-2xl md:text-3xl font-bold text-gray-800"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.h4>
        <motion.div
          className={`p-3 rounded-lg bg-gradient-to-br ${colorMap[color]}`}
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
      </div>
      <div className="text-gray-500 text-sm mt-2">{label}</div>
    </motion.div>
  );
};

// Assignment card with animations
const AssignmentCard = ({ assignment }) => {
  const submissionPercentage = assignment.progress;

  // Function to determine team status badge color
  const getTeamStatusColor = (status) => {
    switch (status) {
      case "Team Complete":
        return "bg-green-100 text-green-700";
      case "Forming Team":
        return "bg-amber-100 text-amber-700";
      case "Not Joined":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Function to determine submission status badge color
  const getSubmissionStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "bg-green-100 text-green-700";
      case "Not Submitted":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
      whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-gray-800">{assignment.name}</h4>
          <div className="text-sm text-gray-500 mt-1">
            <span>{assignment.class}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              new Date(assignment.deadline) < new Date()
                ? "bg-red-100 text-red-700"
                : new Date(assignment.deadline) <
                  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                ? "bg-amber-100 text-amber-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            Due: {assignment.deadline}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-medium text-gray-500">Team Status</div>
          <div className="flex items-center mt-1">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTeamStatusColor(
                assignment.teamstatus
              )}`}
            >
              {assignment.teamstatus === "Team Complete" && (
                <CheckCircle className="h-3 w-3 mr-1" />
              )}
              {assignment.teamstatus === "Forming Team" && (
                <Users className="h-3 w-3 mr-1" />
              )}
              {assignment.teamstatus === "Not Joined" && (
                <AlertCircle className="h-3 w-3 mr-1" />
              )}
              {assignment.teamstatus}
            </span>
          </div>
          {assignment.teamstatus !== "Not Joined" && (
            <div className="text-xs text-gray-500 mt-1">
              {assignment.teamstatus === "Team Complete"
                ? "Your team is ready"
                : `${assignment.minteammembers}-${assignment.maxteammembers} members required`}
            </div>
          )}
        </div>
        <div>
          <div className="text-xs font-medium text-gray-500">Submission</div>
          <div className="flex items-center mt-1">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSubmissionStatusColor(
                assignment.submissionstatus
              )}`}
            >
              {assignment.submissionstatus === "Submitted" && (
                <Check className="h-3 w-3 mr-1" />
              )}
              {assignment.submissionstatus === "Not Submitted" && (
                <Clock className="h-3 w-3 mr-1" />
              )}
              {assignment.submissionstatus}
            </span>
          </div>
          {assignment.submissionstatus === "Not Submitted" && (
            <div className="text-xs text-gray-500 mt-1">
              {new Date(assignment.deadline) < new Date()
                ? "Past due date"
                : `Due in ${Math.ceil(
                    (new Date(assignment.deadline) - new Date()) /
                      (1000 * 60 * 60 * 24)
                  )} days`}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm text-gray-600">{assignment.progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${assignment.progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full rounded-full ${
              assignment.progress >= 100
                ? "bg-green-500"
                : assignment.progress > 60
                ? "bg-blue-500"
                : assignment.progress > 30
                ? "bg-amber-500"
                : "bg-red-500"
            }`}
          ></motion.div>
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row justify-end items-center gap-2">
        <motion.button
          className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm w-full sm:w-auto justify-center sm:justify-start"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FileText className="h-4 w-4" />
          <span>View Details</span>
        </motion.button>
        {assignment.teamstatus === "Not Joined" && (
          <motion.button
            className="flex items-center space-x-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-md text-sm w-full sm:w-auto justify-center sm:justify-start"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus className="h-4 w-4" />
            <span>Join Team</span>
          </motion.button>
        )}
        {assignment.teamstatus === "Forming Team" && (
          <motion.button
            className="flex items-center space-x-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md text-sm w-full sm:w-auto justify-center sm:justify-start"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="h-4 w-4" />
            <span>Manage Team</span>
          </motion.button>
        )}
        {assignment.teamstatus === "Team Complete" && (
          <motion.button
            className="flex items-center space-x-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md text-sm w-full sm:w-auto justify-center sm:justify-start"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
// Team card with animations
const TeamCard = ({ team }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
      whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-gray-800">{team.name}</h4>
          <div className="text-sm text-gray-500 mt-1">
            <span>{team.project}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <span
            className={`bg-${
              team.repostatus === "Connected" ? "green" : "amber"
            }-100 text-${
              team.repostatus === "Connected" ? "green" : "amber"
            }-700 text-xs px-2 py-1 rounded-md`}
          >
            {team.repostatus}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-medium text-gray-500">Assignment</div>
        <div className="text-sm font-medium text-gray-800">
          {team.assignment}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-medium text-gray-500">Team Members</div>
        <div className="flex -space-x-2 mt-2">
          {team.members.map((member) => (
            <motion.div
              key={member.id}
              className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white text-xs font-medium shadow-sm border-2 border-white"
              title={member.name}
              whileHover={{ y: -2, zIndex: 10 }}
            >
              {member.avatar}
            </motion.div>
          ))}
          <motion.div
            className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-medium shadow-sm border-2 border-white"
            whileHover={{ y: -2, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            +
          </motion.div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-medium text-gray-500">Repository</div>
        <div className="text-sm font-medium text-gray-800">
          {team.reponame || "Not connected"}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <motion.button
          className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Users className="h-4 w-4" />
          <span>View Team</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Invitation card with animations
const InvitationCard = ({ invitation }) => {
  // Define status-specific elements
  const renderStatusActions = () => {
    switch (invitation.status.toLowerCase()) {
      case "pending":
        return (
          <div className="mt-4 flex flex-col sm:flex-row justify-end items-center gap-2">
            <motion.button
              className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm w-full sm:w-auto justify-center sm:justify-start"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="h-4 w-4" />
              <span>Decline</span>
            </motion.button>
            <motion.button
              className="flex items-center space-x-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md text-sm w-full sm:w-auto justify-center sm:justify-start"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CheckCircle className="h-4 w-4" />
              <span>Accept</span>
            </motion.button>
          </div>
        );

      case "accepted":
        return (
          <div className="mt-4 flex justify-end items-center">
            <motion.div
              className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              <UserCheck className="h-4 w-4" />
              <span>Joined team</span>
            </motion.div>
          </div>
        );

      case "rejected":
        return (
          <div className="mt-4 flex justify-end items-center">
            <motion.div
              className="flex items-center space-x-1 bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              <XCircle className="h-4 w-4" />
              <span>Declined</span>
            </motion.div>
          </div>
        );

      default:
        return null;
    }
  };

  // Define status badge color based on status
  const getStatusBadgeStyles = () => {
    switch (invitation.status.toLowerCase()) {
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
      whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-gray-800">
            Invitation to join {invitation.teamname}
          </h4>
          <div className="text-sm text-gray-500 mt-1">
            <span>
              {invitation.assignment} - {invitation.class}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <span
            className={`text-xs px-2 py-1 rounded-md ${getStatusBadgeStyles()}`}
          >
            {invitation.status}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-medium text-gray-500">From</div>
          <div className="text-sm font-medium text-gray-800">
            {invitation.sender}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-gray-500">Sent</div>
          <div className="text-sm font-medium text-gray-800">
            {invitation.sentat}
          </div>
        </div>
      </div>

      {/* Render different actions based on status */}
      {renderStatusActions()}
    </motion.div>
  );
};


//? "bg-red-100 text-red-700"
//: daysLeft <= 7
//? "bg-amber-100 text-amber-700"
//: "bg-green-100 text-green-700"



// Enhanced deadline items with animations
const DeadlineItem = ({ title, date, daysLeft, className }) => {
  return (
    <div className="border-l-4 border-blue-400 pl-3 py-2 mb-4">
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-800">{title}</span>
        <span
          className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
            daysLeft < 0
              ? "bg-red-100 text-red-700"
              : daysLeft === 0 || daysLeft === 1
              ? "bg-amber-100 text-amber-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {daysLeft < 0
            ? "Overdue"
            : daysLeft === 0
            ? "Due today"
            : daysLeft === 1
            ? "Due tomorrow"
            : daysLeft < 49
            ? `Due in ${Math.ceil(daysLeft / 7)} weeks`
            : `Due in ${Math.ceil(daysLeft / 30)} months`}
        </span>
      </div>
      <div className="text-gray-500 text-sm mt-1">{date}</div>
      <div className="text-gray-600 text-sm mt-1">{className}</div>
    </div>
  );
};

// Enhanced activity item with animations
const ActivityItem = ({ message, time }) => {
  return (
    <motion.div
      className="border-l-4 border-indigo-400 pl-3 py-1"
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ x: 2, backgroundColor: "#f9fafb" }}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-800">{message}</span>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
    </motion.div>
  );
};

// Enhanced user profile component with animations
const UserProfile = ({ name, department }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <motion.div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        whileHover={{ scale: 1.03 }}
      >
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white font-medium shadow-sm">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <div className="font-medium text-sm">{name}</div>
          <div className="text-xs text-gray-500">{department}</div>
        </div>
        <motion.div
          animate={{ rotate: dropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            className="absolute bottom-full left-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 mb-2 z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-800">{name}</div>
              <div className="text-xs text-gray-500">{department}</div>
            </div>
            <div className="py-1">
              <div className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer text-gray-700">
                <User className="h-4 w-4 mr-2" />
                <span>Profile Settings</span>
              </div>
              <div className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer text-gray-700">
                <Settings className="h-4 w-4 mr-2" />
                <span>Account Settings</span>
              </div>
              <div className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer text-gray-700">
                <Moon className="h-4 w-4 mr-2" />
                <span>Dark Mode</span>
                <div className="ml-auto">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      name="toggle"
                      id="toggle"
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="toggle"
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 py-1">
              <div
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Sign Out</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

// Enhanced calendar widget
const EnhancedCalendarWidget = () => {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const [events,setEvents] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/dashboard-data-events", {
          userEmail: localStorage.getItem("Email"),
        });
        
        // Add defensive check here
        setEvents(response.data.events || {});  // Use empty object as fallback if null
      } catch(err) {
        console.error(err);
        setEvents({});  // Set to empty object on error
      }
    }
    fetchData();
  }, []);
  // State for current date display
  const [currentDate, setCurrentDate] = useState(new Date());
  const [realToday] = useState(new Date()); // Store actual today

  // Event dates - these would normally come from your data
  // Adding some example events for different months
  

  // Auto update every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Get first day of month and total days in month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  // Format for getting events
  const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  const eventDates = (events && events[monthKey]) || [];
  // Navigation functions
  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="w-full max-w-xs bg-white p-4 rounded-lg shadow">
      {/* Calendar header with navigation */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={goToPrevMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        
        <button 
          onClick={goToNextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day, index) => (
          <div
            key={index}
            className="text-center text-xs font-medium text-gray-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before the first day of month */}
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <div key={`empty-${index}`} className="h-8"></div>
        ))}

        {/* Days of month */}
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const isToday = 
            day === realToday.getDate() && 
            currentDate.getMonth() === realToday.getMonth() && 
            currentDate.getFullYear() === realToday.getFullYear();
          const hasEvent = eventDates.includes(day);
          
          return (
            <div
              key={day}
              className="h-10 w-full flex flex-col items-center"
            >
              <div
                className={`h-8 w-8 flex items-center justify-center rounded-full text-sm cursor-pointer relative ${
                  isToday
                    ? "bg-purple-600 text-white font-medium"
                    : day < realToday.getDate() && currentDate.getMonth() === realToday.getMonth() && currentDate.getFullYear() === realToday.getFullYear()
                    ? "text-gray-400 hover:bg-gray-100"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                {day}
              </div>

              {/* Event indicators */}
              {hasEvent && (
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
// Component for Assignments Tab
const AssignmentsTab = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/dashboard-data-assignments",
          {
            userEmail: localStorage.getItem("Email"),
          }
        );
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {assignments.length > 0 ? (
        assignments.map((assignment) => (
          <motion.div variants={itemVariants} key={assignment.id}>
            <AssignmentCard assignment={assignment} />
          </motion.div>
        ))
      ) : (
        <AllCaughtUpAnimation />
      )}
    </motion.div>
  );
};

// Component for Teams Tab
const TeamsTab = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.post(
        "http://localhost:3000/dashboard-data-teams",
        {
          userEmail: localStorage.getItem("Email"),
        }
      );
      setTeams(response.data);
    };
    fetchdata();
  }, []);

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {teams.length > 0 ? (
        teams.map((team) => (
          <motion.div variants={itemVariants} key={team.id}>
            <TeamCard team={team} />
          </motion.div>
        ))
      ) : (
        <NoTeamsAnimation
          message1={"No Teams Found"}
          message2={"You don't have any teams yet!"}
          message3={"Form Team"}
        />
      )}
    </motion.div>
  );
};

// Component for Invitations Tab
const InvitationsTab = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/dashboard-data-invitations",
          {
            userEmail: localStorage.getItem("Email"),
          }
        );
        setInvitations(response.data);
      } catch (error) {
        console.error("Error fetching invitations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Empty dependency array means this runs once when component mounts

  if (loading) {
    return <div className="text-center py-8">Loading invitations...</div>;
  }

  return (
    <motion.div className="space-y-4" initial="hidden" animate="visible">
      {invitations.length > 0 ? (
        <InvitationsList invitations={invitations} />
      ) : (
        <NoInvitationsAnimation />
      )}
    </motion.div>
  );
};

const InvitationsList = ({ invitations }) => {
  const [visiblePending, setVisiblePending] = useState(3);
  const [visibleProcessed, setVisibleProcessed] = useState(3);

  // Separate invitations into pending and processed (accepted/declined)
  const pendingInvitations = invitations.filter(
    (inv) => inv.status.toLowerCase() === "pending"
  );

  const processedInvitations = invitations.filter((inv) =>
    ["accepted", "rejected"].includes(inv.status.toLowerCase())
  );

  // Load more handlers
  const loadMorePending = () => {
    setVisiblePending((prev) => prev + 3);
  };

  const loadMoreProcessed = () => {
    setVisibleProcessed((prev) => prev + 3);
  };

  return (
    <div className="space-y-8">
      {/* Pending Invitations Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Pending Invitations
          {pendingInvitations.length > 0 && (
            <span className="ml-2 bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
              {pendingInvitations.length}
            </span>
          )}
        </h3>

        {pendingInvitations.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No pending invitations
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {pendingInvitations.slice(0, visiblePending).map((invitation) => (
                <motion.div variants={itemVariants} key={invitation.id}>
                  <InvitationCard invitation={invitation} />
                </motion.div>
              ))}
            </motion.div>

            {pendingInvitations.length > visiblePending && (
              <div className="mt-4 text-center">
                <motion.button
                  onClick={loadMorePending}
                  className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Show More</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Processed Invitations Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Previous Invitations
          {processedInvitations.length > 0 && (
            <span className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {processedInvitations.length}
            </span>
          )}
        </h3>

        {processedInvitations.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No previous invitations
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {processedInvitations
                .slice(0, visibleProcessed)
                .map((invitation) => (
                  <motion.div variants={itemVariants} key={invitation.id}>
                    <InvitationCard invitation={invitation} />
                  </motion.div>
                ))}
            </motion.div>

            {processedInvitations.length > visibleProcessed && (
              <div className="mt-4 text-center">
                <motion.button
                  onClick={loadMoreProcessed}
                  className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Show More</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Main StudentDashboard Component
const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("assignments");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const studentName = localStorage.getItem("UserName") || "User";
  const [stats, setStats] = useState([]);
  const [upcomingDeadline, setUpcomingDeadline] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        "http://localhost:3000/dashboard-data-stats",
        {
          userEmail: localStorage.getItem("Email"),
        }
      );
      const response2 = await axios.post(
        "http://localhost:3000/dashboard-data-upcomingDeadlines",
        {
          userEmail: localStorage.getItem("Email"),
        }
      );
      setUpcomingDeadline(response2.data);
      setStats(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-gray-800 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation - Enhanced with animation */}
      <motion.aside
        className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 shadow-md fixed h-screen z-20"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ClassGit
          </h1>
        </div>
        <nav className="flex-grow mt-4 overflow-y-auto">
          <SidebarNavItem
            icon={<Home className="h-5 w-5" />}
            text="Dashboard"
            active={activeSection === "dashboard"}
            onClick={() => setActiveSection("dashboard")}
          />
          <SidebarNavItem
            icon={<BookOpen className="h-5 w-5" />}
            text="Assignments"
            active={activeSection === "assignments"}
            onClick={() => setActiveSection("assignments")}
          />
          <SidebarNavItem
            icon={<Users className="h-5 w-5" />}
            text="Teams"
            active={activeSection === "teams"}
            onClick={() => setActiveSection("teams")}
          />
          <SidebarNavItem
            icon={<Book className="h-5 w-5" />}
            text="Classes"
            active={activeSection === "classes"}
            onClick={() => setActiveSection("classes")}
          />
          <SidebarNavItem
            icon={<MessageSquare className="h-5 w-5" />}
            text="Messages"
            active={activeSection === "messages"}
            onClick={() => setActiveSection("messages")}
          />
          <SidebarNavItem
            icon={<Bell className="h-5 w-5" />}
            text="Notifications"
            active={activeSection === "notifications"}
            onClick={() => setActiveSection("notifications")}
            badge={stats.pendinginvitations}
          />
        </nav>
        <div className="p-4 border-t border-gray-200 mt-auto">
          <UserProfile name={studentName} department="Computer Science" />
        </div>
      </motion.aside>

      {/* Mobile Sidebar - Animated */}
      <motion.aside
        className="lg:hidden fixed h-screen w-64 bg-white border-r border-gray-200 shadow-lg z-40"
        initial={{ x: "-100%" }}
        animate={{ x: mobileMenuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ClassGit
          </h1>
          <motion.button
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="h-6 w-6" />
          </motion.button>
        </div>
        <nav className="flex-grow py-2 overflow-y-auto">
          <SidebarNavItem
            icon={<Home className="h-5 w-5" />}
            text="Dashboard"
            active={activeSection === "dashboard"}
            onClick={() => {
              setActiveSection("dashboard");
              setMobileMenuOpen(false);
            }}
          />
          <SidebarNavItem
            icon={<BookOpen className="h-5 w-5" />}
            text="Assignments"
            active={activeSection === "assignments"}
            onClick={() => {
              setActiveSection("assignments");
              setMobileMenuOpen(false);
            }}
          />
          <SidebarNavItem
            icon={<Users className="h-5 w-5" />}
            text="Teams"
            active={activeSection === "teams"}
            onClick={() => {
              setActiveSection("teams");
              setMobileMenuOpen(false);
            }}
          />
          <SidebarNavItem
            icon={<Book className="h-5 w-5" />}
            text="Classes"
            active={activeSection === "classes"}
            onClick={() => {
              setActiveSection("classes");
              setMobileMenuOpen(false);
            }}
          />
          <SidebarNavItem
            icon={<MessageSquare className="h-5 w-5" />}
            text="Messages"
            active={activeSection === "messages"}
            onClick={() => {
              setActiveSection("messages");
              setMobileMenuOpen(false);
            }}
          />
          <SidebarNavItem
            icon={<Bell className="h-5 w-5" />}
            text="Notifications"
            active={activeSection === "notifications"}
            onClick={() => {
              setActiveSection("notifications");
              setMobileMenuOpen(false);
            }}
            badge={stats.pendinginvitations}
          />
        </nav>
        <div className="p-4 border-t border-gray-200 mt-auto">
          <UserProfile name={studentName} department="Computer Science" />
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <motion.header
          className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 md:px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <motion.button
                onClick={() => setMobileMenuOpen(true)}
                className="mr-4 lg:hidden text-gray-600 hover:text-gray-800 p-1 rounded-md hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="h-6 w-6" />
              </motion.button>
              <div className="flex items-center lg:hidden">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ClassGit
                </h1>
              </div>
              <div className="hidden lg:block ml-4">
                <span className="text-gray-700 font-medium">
                  Student Dashboard
                </span>
              </div>
            </div>

            {/* Search Bar - Enhanced for medium screens */}
            <div className="hidden md:block mx-4 lg:mx-0 flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out sm:text-sm"
                  placeholder="Search..."
                />
              </div>
            </div>

            <div className="flex items-center space-x-1 md:space-x-4">
              <motion.button
                className="relative hover:bg-gray-100 p-2 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {stats.pendinginvitations > 0 && (
                  <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                )}
              </motion.button>
              <motion.button
                className="hover:bg-gray-100 p-2 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="h-5 w-5 text-gray-600" />
              </motion.button>
              <div className="border-l border-gray-200 h-8 mx-1 hidden sm:block"></div>
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white font-medium shadow-sm">
                  {studentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-700">
                    {studentName.split(" ")[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Left Column - Main Content */}
              <div className="flex-grow lg:max-w-[65%]">
                {/* Welcome Section */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-6 md:mb-8 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Welcome, {studentName.split(" ")[0]}!
                  </h2>
                  <div className="text-gray-600 mt-2">
                    <DynamicDateHeading flag={1}/>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                    <StatCard
                      value={stats.activeassignments || 0}
                      label="Active Assignments"
                      color="blue"
                      icon={<BookOpen className="h-5 w-5 text-white" />}
                    />
                    <StatCard
                      value={stats.upcomingdeadlines || 0}
                      label="Upcoming Deadlines"
                      color="amber"
                      icon={<Clock className="h-5 w-5 text-white" />}
                    />
                    <StatCard
                      value={stats.pendinginvitations || 0}
                      label="Team Invitations"
                      color="indigo"
                      icon={<Users className="h-5 w-5 text-white" />}
                    />
                  </div>
                </motion.div>

                {/* Tabs Navigation */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  whileHover={{
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="border-b border-gray-200">
                    <div className="flex overflow-x-auto hide-scrollbar py-2 px-2 md:px-4">
                      <TabButton
                        active={activeTab === "assignments"}
                        onClick={() => setActiveTab("assignments")}
                        icon={<BookOpen className="h-5 w-5" />}
                        text="Assignments"
                      />
                      <TabButton
                        active={activeTab === "teams"}
                        onClick={() => setActiveTab("teams")}
                        icon={<Users className="h-5 w-5" />}
                        text="My Teams"
                      />
                      <TabButton
                        active={activeTab === "invitations"}
                        onClick={() => setActiveTab("invitations")}
                        icon={<Bell className="h-5 w-5" />}
                        text="Invitations"
                        badge={stats.pendinginvitations}
                      />
                    </div>
                  </div>

                  {/* Tab Content with AnimatePresence for smooth transitions */}
                  <div className="p-4 md:p-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {activeTab === "assignments" && <AssignmentsTab />}
                        {activeTab === "teams" && <TeamsTab />}
                        {activeTab === "invitations" && <InvitationsTab />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* Right Sidebar */}
              <div className="lg:w-80 xl:w-96 space-y-6 flex-shrink-0">
                {/* Calendar Widget */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  whileHover={{
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                      Calendar
                    </h3>
                    <span className="text-sm font-medium bg-purple-50 text-purple-700 px-2 py-1 rounded-md">
                      <DynamicDateHeading flag={2} />
                    </span>
                  </div>
                  <EnhancedCalendarWidget />
                  <div className="mt-4 flex justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-600">Due Dates</span>
                    </div>
                  </div>
                </motion.div>

                {/* Upcoming Deadlines */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  whileHover={{
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 className="font-semibold text-gray-800 flex items-center mb-4">
                    <Clock className="h-5 w-5 mr-2 text-red-500" />
                    Upcoming Deadlines
                  </h3>
                  <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants}>
                      {upcomingDeadline.length === 0 ? (
                        <p>No Upcoming Deadlines </p>
                      ) : null}
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      {upcomingDeadline[0] && (
                        <DeadlineItem
                          title={upcomingDeadline[0].title}
                          date={upcomingDeadline[0].due_date}
                          daysLeft={upcomingDeadline[0].days_left}
                          className={upcomingDeadline[0].course}
                        />
                      )}
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      {upcomingDeadline[1] && (
                        <DeadlineItem
                          title={upcomingDeadline[1].title}
                          date={upcomingDeadline[1].due_date}
                          daysLeft={upcomingDeadline[1].days_left}
                          className={upcomingDeadline[1].course}
                        />
                      )}
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      {upcomingDeadline[2] && (
                        <DeadlineItem
                          title={upcomingDeadline[2].title}
                          date={upcomingDeadline[2].due_date}
                          daysLeft={upcomingDeadline[2].days_left}
                          className={upcomingDeadline[2].course}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  whileHover={{
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 className="font-semibold text-gray-800 flex items-center mb-4">
                    <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                    Recent Activity
                  </h3>
                  <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants}>
                      <ActivityItem
                        message="Maria Garcia submitted Web Development Final Project"
                        time="2 hours ago"
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <ActivityItem
                        message="You joined team 'Data Wizards'"
                        time="Yesterday"
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <ActivityItem
                        message="New assignment: Database Design posted in CS305"
                        time="3 days ago"
                      />
                    </motion.div>
                  </motion.div>
                  <div className="mt-4 text-center">
                    <motion.button
                      className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View All Activity
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="container mx-auto px-4 md:px-6 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <div className="mb-3 md:mb-0">
            </div>
            <div className="flex flex-wrap justify-center space-x-4 md:space-x-6">
              <a
                href="#"
                className="hover:text-blue-600 transition-colors mb-2 md:mb-0"
              >
                Help
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors mb-2 md:mb-0"
              >
                Documentation
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors mb-2 md:mb-0"
              >
                Contact Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const getFormattedDate = () => {
  const today = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return today.toLocaleDateString("en-US", options);
};

const DynamicDateHeading = ({flag}) => {
  return (
    flag===1?
    <h2>
      Today is {getFormattedDate()}. Here's what's happening with your
      assignments and teams.
    </h2>:<>{getFormattedDate()}</>
  );
};

export default StudentDashboard;
