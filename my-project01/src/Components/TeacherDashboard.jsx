import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Home,
  BookOpen,
  Users,
  Book,
  MessageSquare,
  Bell,
  Settings,
  Calendar,
  Clock,
  CheckCircle,
  PlusCircle,
  FileText,
  Star,
  XCircle,
  Edit,
  Download,
  Filter,
  Menu,
  X,
  ChevronDown,
  User,
  Moon,
  LogOut,
  Search,
} from "lucide-react";

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

// Action button with motion effects
const ActionButton = ({ icon, text, color }) => {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    green: "bg-green-100 text-green-700 hover:bg-green-200",
    purple: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    amber: "bg-amber-100 text-amber-700 hover:bg-amber-200",
    red: "bg-red-100 text-red-700 hover:bg-red-200",
  };

  return (
    <motion.button
      className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium ${colorMap[color]} transition-colors`}
      whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ y: 0, boxShadow: "none" }}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </motion.button>
  );
};

// Class selector with animations
const ClassSelector = ({ name, count }) => {
  return (
    <motion.button
      className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
      whileHover={{ x: 4, backgroundColor: "#f9fafb" }}
      whileTap={{ x: 0 }}
    >
      <span className="font-medium text-gray-800">{name}</span>
      <span className="text-sm text-gray-500">{count} students</span>
    </motion.button>
  );
};

// Teacher activity item with subtle animation
const TeacherActivityItem = ({ action, subject, student, time }) => {
  return (
    <motion.div
      className="border-l-4 border-blue-400 pl-3 py-1"
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ x: 2, backgroundColor: "#f9fafb" }}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-800">{action}</span>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <div className="text-gray-600 text-sm mt-1">{subject}</div>
      <div className="text-gray-500 text-xs mt-1">Student: {student}</div>
    </motion.div>
  );
};

// Enhanced user profile component with animations
const UserProfile = ({ name, department }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <motion.div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        whileHover={{ scale: 1.03 }}
      >
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center text-white font-medium shadow-sm">
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
            <div
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="border-t border-gray-100 py-1"
            >
              <div className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer text-red-600">
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

// Enhanced calendar widget
const EnhancedCalendarWidget = ({ currentDate }) => {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const today = new Date("March 15, 2025");
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Event dates - these would normally come from your data
  const eventDates = [5, 12, 15, 19, 25];
  const meetingDates = [3, 10, 17, 24];

  return (
    <div className="w-full">
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

      <div className="grid grid-cols-7 gap-1">
        {/* First day starts on a Saturday (filling empty days) */}
        {[...Array(6)].map((_, index) => (
          <div key={`empty-${index}`} className="h-8"></div>
        ))}

        {daysInMonth.map((day) => (
          <motion.div
            key={day}
            className={`h-8 w-8 flex items-center justify-center rounded-full text-sm cursor-pointer relative mx-auto ${
              day === currentDate
                ? "bg-purple-600 text-white font-medium"
                : day < currentDate
                ? "text-gray-400 hover:bg-gray-100"
                : "text-gray-800 hover:bg-gray-100"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {day}

            {/* Event indicators */}
            {eventDates.includes(day) && (
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            )}

            {meetingDates.includes(day) && (
              <span className="absolute -bottom-1 left-1/3 transform -translate-x-1/2 w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Assignment submission card with animations
const SubmissionCard = ({
  student,
  title,
  course,
  submittedTime,
  dueDate,
  urgent,
  isTeam = false,
}) => {
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
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <div className="text-sm text-gray-500 mt-1">
            {isTeam ? (
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" /> {student}
              </span>
            ) : (
              <span>{student}</span>
            )}
            <span className="mx-2">•</span>
            <span>{course}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          {urgent && (
            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-md">
              Urgent
            </span>
          )}
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md">
            {submittedTime}
          </span>
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>Due: {dueDate}</span>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto justify-end">
          <motion.button
            className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </motion.button>
          <motion.button
            className="flex items-center space-x-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-md text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CheckCircle className="h-4 w-4" />
            <span>Review</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Assignment card with animations
const AssignmentCard = ({
  title,
  course,
  dueDate,
  submissions,
  totalStudents,
  status,
}) => {
  const submissionPercentage = Math.round((submissions / totalStudents) * 100);
  const isCompleted = status === "completed";

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
          <div className="flex items-center">
            <h4 className="font-semibold text-gray-800">{title}</h4>
            {isCompleted && (
              <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md">
                Completed
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            <span>{course}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md">
            Due: {dueDate}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Submissions</span>
          <span className="text-sm text-gray-600">
            {submissions}/{totalStudents} ({submissionPercentage}%)
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${submissionPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full rounded-full ${
              isCompleted ? "bg-green-500" : "bg-blue-500"
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
        <motion.button
          className="flex items-center space-x-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md text-sm w-full sm:w-auto justify-center sm:justify-start"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Create assignment tab
const CreateAssignmentTab = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [currDate, setCurrentDate] = useState("");
  const [selectedSubject, setSelectedSubject] = useState();
  const [selectedSection, setSelectedSection] = useState();
  const [dueDate, setDueDate] = useState();
  const [dueTime, setDueTime] = useState();
  const [description, setDescription] = useState();
  const [assignmentType, setAssignmentType] = useState();
  const [allowLate, setAllowLate] = useState(false);
  const [enablePlagiarism, setEnablePlagiarism] = useState(false);
  const [autoGrade, setAutoGrade] = useState(false);
  const [minMembers, setMinMembers] = useState(1);
  const [maxMembers, setMaxMembers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sendMail, setSendMail] = useState(false);
  const [reviews, setReviews] = useState([{ reviewNo: "1", reviewName: "", description: "",reviewMarks: "" }]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/tDashboard-data-subjects",
          {
            userEmail: localStorage.getItem("Email"),
          }
        );
        const response1 = await axios.get(
          "http://localhost:3000/tDashboard-data-sections"
        );

        setSections(response1.data);
        setSubjects(response.data);
        const date = new Date();
        const month = date.getMonth() + 2;
        const day = date.getDate();
        setCurrentDate(
          `${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${
            day < 10 ? `0${day}` : day
          }`
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [setCurrentDate]);

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleSelectedSubject(e) {
    setSelectedSubject(e.target.value);
  }

  function handleDueDate(e) {
    setDueDate(e.target.value);
  }

  function handleDueTime(e) {
    setDueTime(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleAssignmentType(e) {
    setAssignmentType(e.target.value);
  }


  
  const handleAddReview = () => {
    // Get the last review number and increment it
    const lastReviewNo = reviews.length > 0 
      ? parseInt(reviews[reviews.length - 1].reviewNo) + 1 
      : 1;

    setReviews([
      ...reviews, 
      { 
        reviewNo: lastReviewNo.toString(), 
        reviewName: "", 
        description: "",
        reviewMarks: ""
      }
    ]);
  };

    
  const handleReviewNameChange = (index, value) => {
    const newReviews = [...reviews];
    newReviews[index].reviewName = value;
    setReviews(newReviews);
  };
  const handleReviewMarksChange = (index, value) => {
    const newReviews = [...reviews];
    newReviews[index].reviewMarks = value;
    setReviews(newReviews);
  };

  const handleDescriptionChange = (index, value) => {
    const newReviews = [...reviews];
    newReviews[index].description = value;
    setReviews(newReviews);
  };


  async function handleCreateAssignment() {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/tDashboard-create-assignment",
        {
          title: title,
          subject: selectedSubject,
          dueDate: dueDate,
          dueTime: dueTime,
          description: description,
          assignmentType: assignmentType,
          allowLate: allowLate,
          enablePlagiarism: enablePlagiarism,
          autoGrade: autoGrade,
          minMembers: minMembers,
          maxMembers: maxMembers,
          section: selectedSection,
          createdby: localStorage.getItem("Email"),
          createdbyName: localStorage.getItem("UserName"),
          sendMail: sendMail,
          reviews: reviews
        }
      );
      console.log(response.data);
      alert("Assignment Created");
      setLoading(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return loading ? (
    sendMail ? (
      <div>
        <h1>Creating Assignment...</h1>
        <h1>Sending Emails...</h1>
      </div>
    ) : (
      <h1>Creating Assignment...</h1>
    )
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Create New Assignment
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assignment Title
          </label>
          <input
            onChange={handleTitle}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter assignment title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <select
            onChange={handleSelectedSubject}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a Subject</option>
            {subjects.map((subject) => {
              return (
                <option key={subject.subjectid} value={subject.subjectid}>
                  {subject.subjectname}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section
          </label>
          <select
            onChange={(e) => {
              setSelectedSection(e.target.value);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a section</option>
            {sections.map((section) => {
              return (
                <option key={section.sectionid} value={section.sectionid}>
                  {section.sectionname}
                </option>
              );
            })}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              onChange={handleDueDate}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue={currDate}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Time
            </label>
            <input
              onChange={handleDueTime}
              type="time"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue="23:59"
            />
          </div>
        </div>



        <div className="space-y-4">
      {reviews.map((review, index) => (
        <div key={index} className="border border-gray-300 rounded-md p-4 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review No.
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={review.reviewNo}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marks
              </label>
              <input
                type="Number"
                step="any"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={review.reviewMarks}
                onChange={(e) => handleReviewMarksChange(index, e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Review Name"
                value={review.reviewName}
                onChange={(e) => handleReviewNameChange(index, e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter assignment description"
              value={review.description}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
            ></textarea>
          </div>
        </div>
      ))}
      <div>
        <motion.button
          onClick={handleAddReview}
          className="w-full py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Review
        </motion.button>
      </div>
    </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            onChange={handleDescription}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            placeholder="Enter assignment description"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assignment Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center space-x-2">
              <input
                onChange={handleAssignmentType}
                type="radio"
                id="individual"
                name="assignmentType"
                value="individual"
              />
              <label htmlFor="individual">Individual</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                onChange={handleAssignmentType}
                type="radio"
                id="group"
                name="assignmentType"
                value="group"
              />
              <label htmlFor="group">Group Project</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                onChange={handleAssignmentType}
                type="radio"
                id="peer"
                name="assignmentType"
                value="peer"
              />
              <label htmlFor="peer">Peer Review</label>
            </div>
          </div>
        </div>

        {assignmentType === "group" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Members
              </label>
              <input
                type="number"
                min="1"
                max={maxMembers}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter min members"
                value={minMembers}
                onChange={(e) => setMinMembers(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Members
              </label>
              <input
                type="number"
                min={minMembers}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter max members"
                value={maxMembers}
                onChange={(e) => setMaxMembers(e.target.value)}
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Materials
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <PlusCircle className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-500">
                Drag and drop files here or click to browse
              </p>
              <motion.button
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Upload Files
              </motion.button>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Options
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                onChange={() => {
                  setAllowLate(!allowLate);
                }}
                type="checkbox"
                id="allowLate"
              />
              <label htmlFor="allowLate" className="text-sm text-gray-700">
                Allow late submissions
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                onChange={() => {
                  setEnablePlagiarism(!enablePlagiarism);
                }}
                type="checkbox"
                id="enablePlagiarism"
              />
              <label
                htmlFor="enablePlagiarism"
                className="text-sm text-gray-700"
              >
                Enable plagiarism detection
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                onChange={() => {
                  setAutoGrade(!autoGrade);
                }}
                type="checkbox"
                id="autoGrade"
              />
              <label htmlFor="autoGrade" className="text-sm text-gray-700">
                Enable auto-grading
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                onChange={() => {
                  setSendMail(!sendMail);
                }}
                type="checkbox"
                id="sendEmal"
              />
              <label htmlFor="allowLate" className="text-sm text-gray-700">
                Notify students via Email
              </label>
            </div>
          </div>
          <motion.button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreateAssignment} // ✅ Moved here
          >
            Create Assignment
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// All assignments tab content
const AllAssignmentsTab = () => {
  const [assignmentData, serAssignmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/tDashboard-data-assignments",
          {
            userEmail: localStorage.getItem("Email"),
          }
        );
        serAssignmentData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-800">All Assignments</h3>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          <motion.button
            className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </motion.button>
          <motion.button
            className="flex items-center space-x-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Assignment</span>
          </motion.button>
        </div>
      </div>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {assignmentData.map((assignment) => (
          <motion.div variants={itemVariants}>
            <AssignmentCard
              title={assignment.title}
              course={assignment.course}
              dueDate={assignment.duedate.slice(0, 10)}
              submissions={assignment.submissions}
              totalStudents={assignment.totalstudents}
              status={assignment.status}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Pending reviews tab content
const PendingReviewsTab = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6">
        <motion.div
          className="h-12 w-12 border-4 border-gray-200 border-t-blue-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Pending Student Submissions
        </h3>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          <motion.button
            className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </motion.button>
          <motion.button
            className="flex items-center space-x-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Clock className="h-4 w-4" />
            <span>Sort by deadline</span>
          </motion.button>
        </div>
      </div>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <SubmissionCard
            student="Alex Johnson"
            title="Web Development Project"
            course="CS401"
            submittedTime="2 days ago"
            dueDate="March 15, 2025"
            urgent={true}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <SubmissionCard
            student="Emily Chen"
            title="Database Schema Design"
            course="CS205"
            submittedTime="1 day ago"
            dueDate="March 18, 2025"
            urgent={false}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <SubmissionCard
            student="Michael Brown"
            title="Data Structures Assignment"
            course="CS301"
            submittedTime="3 days ago"
            dueDate="March 16, 2025"
            urgent={true}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <SubmissionCard
            student="Team Apollo"
            title="Advanced AI Project"
            course="CS501"
            submittedTime="12 hours ago"
            dueDate="March 20, 2025"
            urgent={false}
            isTeam={true}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <SubmissionCard
            student="Sophia Martinez"
            title="Data Visualization Project"
            course="CS401"
            submittedTime="4 days ago"
            dueDate="March 17, 2025"
            urgent={true}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Main TeacherDashboard Component
const TeacherDashboard = () => {
  const [subjects, setSubjects] = useState();
  const [activeTab, setActiveTab] = useState("pending");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const teacherName = localStorage.getItem("UserName");
  const [addClass, setAddClass] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [subLoading, setSubLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/tDashboard-data-subjects",
          {
            userEmail: localStorage.getItem("Email"),
          }
        );
        setSubjects(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const stats = {
    pendingAssignments: 8,
    totalStudents: 124,
    activeClasses: 4,
    teamProjects: 6,
  };

  async function handleAddSubject() {
    try {
      setSubLoading(true);
      const response = await axios.post(
        "http://localhost:3000/tDashboard-add-subject",
        {
          newSubject: newSubject,
          userEmail: localStorage.getItem("Email"),
        }
      );
      setSubLoading(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error adding subject");
    }
  }

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
            text="Students"
            active={activeSection === "students"}
            onClick={() => setActiveSection("students")}
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
            badge={3}
          />
        </nav>
        <div className="p-4 border-t border-gray-200 mt-auto">
          <UserProfile name={teacherName} department="Computer Science Dept." />
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
            text="Students"
            active={activeSection === "students"}
            onClick={() => {
              setActiveSection("students");
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
            badge={3}
          />
        </nav>
        <div className="p-4 border-t border-gray-200 mt-auto">
          <UserProfile name={teacherName} department="Computer Science Dept." />
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
                  Teacher Dashboard
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
                <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
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
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center text-white font-medium shadow-sm">
                  {teacherName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-700">
                    {teacherName.split(" ")[0]}
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
                    Welcome back, Prof. {teacherName.split(" ")[0]}!
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Today is Saturday, March 15, 2025. You have{" "}
                    {stats.pendingAssignments} pending submissions to review.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">
                    <StatCard
                      value={stats.pendingAssignments}
                      label="Pending Reviews"
                      color="red"
                      icon={<Clock className="h-5 w-5 text-white" />}
                    />
                    <StatCard
                      value={stats.totalStudents}
                      label="Total Students"
                      color="blue"
                      icon={<Users className="h-5 w-5 text-white" />}
                    />
                    <StatCard
                      value={stats.activeClasses}
                      label="Active Classes"
                      color="green"
                      icon={<Book className="h-5 w-5 text-white" />}
                    />
                    <StatCard
                      value={stats.teamProjects}
                      label="Team Projects"
                      color="amber"
                      icon={<Users className="h-5 w-5 text-white" />}
                    />
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm p-5 md:p-6 mb-6 md:mb-8 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  whileHover={{
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                    <ActionButton
                      icon={<PlusCircle className="h-5 w-5" />}
                      text="Create Assignment"
                      color="blue"
                    />
                    <ActionButton
                      icon={<CheckCircle className="h-5 w-5" />}
                      text="Review Submissions"
                      color="green"
                    />
                    <ActionButton
                      icon={<FileText className="h-5 w-5" />}
                      text="View Reports"
                      color="purple"
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
                        active={activeTab === "pending"}
                        onClick={() => setActiveTab("pending")}
                        icon={<Clock className="h-5 w-5" />}
                        text="Pending Reviews"
                        badge={stats.pendingAssignments}
                      />
                      <TabButton
                        active={activeTab === "all"}
                        onClick={() => setActiveTab("all")}
                        icon={<FileText className="h-5 w-5" />}
                        text="All Assignments"
                      />
                      <TabButton
                        active={activeTab === "create"}
                        onClick={() => setActiveTab("create")}
                        icon={<PlusCircle className="h-5 w-5" />}
                        text="Create Assignment"
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
                        {activeTab === "pending" && <PendingReviewsTab />}
                        {activeTab === "all" && <AllAssignmentsTab />}
                        {activeTab === "create" && <CreateAssignmentTab />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* Right Sidebar */}
              <div className="lg:w-80 xl:w-96 space-y-6 flex-shrink-0">
                {/* Class Selector */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  whileHover={{
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 className="font-semibold text-gray-800 flex items-center mb-4">
                    <Book className="h-5 w-5 mr-2 text-blue-600" />
                    My Subjects
                  </h3>
                  <div className="space-y-2">
                    {subjects
                      ? subjects.map((subject) => {
                          return (
                            <ClassSelector
                              key={subject.subjectid}
                              name={subject.subjectname}
                              count={"NA"}
                            />
                          );
                        })
                      : null}
                  </div>
                  {addClass && (
                    <div className="flex w-full border border-gray-300 rounded-md">
                      <input
                        onChange={(e) => setNewSubject(e.target.value)}
                        type="text"
                        className="flex-grow px-3 py-2 focus:outline-none rounded-l-md"
                        placeholder="Enter Subject Name"
                      />
                      {subLoading ? (
                        "Adding..."
                      ) : (
                        <motion.button
                          onClick={handleAddSubject}
                          className="px-3 py-2 bg-blue-100 text-blue-700 rounded-r-md text-sm hover:bg-blue-200 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Done
                        </motion.button>
                      )}
                    </div>
                  )}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <motion.button
                      onClick={() => {
                        setAddClass(true);
                      }}
                      className="w-full py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center"
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add New Subject
                    </motion.button>
                  </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  whileHover={{
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
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
                      <TeacherActivityItem
                        action="Graded"
                        subject="Database Assignment"
                        student="Alex Johnson"
                        time="2 hours ago"
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <TeacherActivityItem
                        action="Created"
                        subject="Web Development Project"
                        student="CS401 Class"
                        time="Yesterday"
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <TeacherActivityItem
                        action="Commented on"
                        subject="Algorithm Analysis"
                        student="Maria Rodriguez"
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

                {/* Calendar Widget */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
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
                      March 2025
                    </span>
                  </div>
                  <EnhancedCalendarWidget currentDate={15} />
                  <div className="mt-4 flex justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-600">Due Dates</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-600">Office Hours</span>
                    </div>
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
              © 2025 ClassGit. All rights reserved.
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

export default TeacherDashboard;
