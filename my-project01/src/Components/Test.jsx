import React, { useState, useEffect } from "react";
import {
  Bell,
  Settings,
  Calendar,
  Users,
  BookOpen,
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
} from "lucide-react";
import "../index.css";

// Sample data - in a real app, this would come from API calls
const stats = {
  activeAssignments: 4,
  upcomingDeadlines: 2,
  pendingInvitations: 3,
};

// Sample assignments data
const assignments = [
  {
    id: 1,
    name: "Web Development Final Project",
    class: "CS401: Advanced Web Technologies",
    deadline: "March 8, 2025",
    teamStatus: "Team Complete",
    submissionStatus: "Not Submitted",
    progress: 65,
  },
  {
    id: 2,
    name: "Database Design Assignment",
    class: "CS305: Database Systems",
    deadline: "April 10, 2025",
    teamStatus: "Forming Team",
    submissionStatus: "Not Submitted",
    progress: 30,
  },
  {
    id: 3,
    name: "Algorithm Analysis",
    class: "CS301: Algorithms",
    deadline: "March 15, 2025",
    teamStatus: "Not Joined",
    submissionStatus: "Not Submitted",
    progress: 0,
  },
];

// Sample teams data
const teams = [
  {
    id: 1,
    name: "Web Warriors",
    project: "E-commerce Platform",
    assignment: "Web Development Final Project",
    members: [
      { id: 1, name: "Alex Johnson", avatar: "AJ" },
      { id: 2, name: "Maria Garcia", avatar: "MG" },
      { id: 3, name: "David Lee", avatar: "DL" },
    ],
    repoStatus: "Connected",
    repoName: "web-warriors/ecommerce-platform",
  },
  {
    id: 2,
    name: "Data Wizards",
    project: "Hospital Management System",
    assignment: "Database Design Assignment",
    members: [
      { id: 1, name: "Alex Johnson", avatar: "AJ" },
      { id: 4, name: "Sarah Wilson", avatar: "SW" },
    ],
    repoStatus: "Not Connected",
    repoName: null,
  },
];

// Sample invitations data
const invitations = [
  {
    id: 1,
    sender: "Maria Garcia",
    teamName: "Frontend Ninjas",
    assignment: "Web Development Final Project",
    class: "CS401: Advanced Web Technologies",
    sentAt: "2 hours ago",
  },
  {
    id: 2,
    sender: "James Wilson",
    teamName: "Algorithm Masters",
    assignment: "Algorithm Analysis",
    class: "CS301: Algorithms",
    sentAt: "Yesterday",
  },
  {
    id: 3,
    sender: "Emily Zhang",
    teamName: "Database Designers",
    assignment: "Database Design Assignment",
    class: "CS305: Database Systems",
    sentAt: "2 days ago",
  }
];

// Main Dashboard Component
const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("assignments");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const studentName = localStorage.getItem("UserName")?.split(" ")[0] || "User"; // This would come from your auth context

  function FormattedDate() {
    const today = new Date();
    const formattedDate = today.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    return <span>{formattedDate}</span>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation - Fixed positioning for stationary behavior */}
      <aside className="hidden lg:flex flex-col fixed h-screen w-64 bg-white border-r border-gray-200 shadow-md z-20 transition-all duration-300">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ClassGit
          </h1>
        </div>
        <nav className="flex-grow mt-6 overflow-y-auto">
          <SidebarNavItem
            icon={<Home className="h-5 w-5" />}
            text="Dashboard"
            active={true}
          />
          <SidebarNavItem
            icon={<BookOpen className="h-5 w-5" />}
            text="Assignments"
            active={false}
          />
          <SidebarNavItem
            icon={<Users className="h-5 w-5" />}
            text="Teams"
            active={false}
          />
          <SidebarNavItem
            icon={<Book className="h-5 w-5" />}
            text="Classes"
            active={false}
          />
          <SidebarNavItem
            icon={<MessageSquare className="h-5 w-5" />}
            text="Messages"
            active={false}
          />
          <SidebarNavItem
            icon={<Bell className="h-5 w-5" />}
            text="Notifications"
            active={false}
            badge={stats.pendingInvitations}
          />
        </nav>
        <div className="p-4 border-t border-gray-200 mt-auto">
          <UserProfile name={studentName} department="Computer Science" />
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`lg:hidden fixed h-screen w-64 bg-white border-r border-gray-200 shadow-lg z-40 transition-all duration-300 transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ClassGit
          </h1>
          <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <nav className="flex-grow mt-6 overflow-y-auto">
          <SidebarNavItem
            icon={<Home className="h-5 w-5" />}
            text="Dashboard"
            active={true}
          />
          <SidebarNavItem
            icon={<BookOpen className="h-5 w-5" />}
            text="Assignments"
            active={false}
          />
          <SidebarNavItem
            icon={<Users className="h-5 w-5" />}
            text="Teams"
            active={false}
          />
          <SidebarNavItem
            icon={<Book className="h-5 w-5" />}
            text="Classes"
            active={false}
          />
          <SidebarNavItem
            icon={<MessageSquare className="h-5 w-5" />}
            text="Messages"
            active={false}
          />
          <SidebarNavItem
            icon={<Bell className="h-5 w-5" />}
            text="Notifications"
            active={false}
            badge={stats.pendingInvitations}
          />
        </nav>
        <div className="p-4 border-t border-gray-200 mt-auto">
          <UserProfile name={studentName} department="Computer Science" />
        </div>
      </aside>

      {/* Main Content - Add left margin to accommodate fixed sidebar */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(true)} 
                className="mr-4 lg:hidden text-gray-600 hover:text-gray-800"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="lg:hidden">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ClassGit
                </h1>
              </div>
              <div className="hidden lg:block">
                <span className="text-gray-700 font-medium">
                  Student Dashboard
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <GlobalSearch />
              <button className="relative hover:bg-gray-100 p-2 rounded-full transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
                {stats.pendingInvitations > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm animate-pulse">
                    {stats.pendingInvitations}
                  </span>
                )}
              </button>
              <button className="hover:bg-gray-100 p-2 rounded-full transition-colors">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <div className="lg:hidden flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white font-medium shadow-sm">
                  {studentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Main Content */}
              <div className="flex-grow lg:max-w-[65%]">
                {/* Welcome Section */}
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100 hover:shadow-md transition-all duration-300">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Welcome back, {studentName.split(" ")[0]}!
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Here's what's happening with your assignments and teams.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                    <StatCard
                      value={stats.activeAssignments}
                      label="Active Assignments"
                      color="blue"
                    />
                    <StatCard
                      value={stats.upcomingDeadlines}
                      label="Upcoming Deadlines"
                      color="amber"
                    />
                    <StatCard
                      value={stats.pendingInvitations}
                      label="Team Invitations"
                      color="indigo"
                    />
                  </div>
                </div>

                {/* Tabs Navigation */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="border-b border-gray-200">
                    <div className="flex space-x-8 p-4 overflow-x-auto">
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
                        badge={stats.pendingInvitations}
                      />
                    </div>
                  </div>

                  {/* Tab Content with smooth transition */}
                  <div className="p-6">
                    <div className="transition-opacity duration-300 ease-in-out">
                      {activeTab === "assignments" && <AssignmentsTab />}
                      {activeTab === "teams" && <TeamsTab />}
                      {activeTab === "invitations" && <InvitationsTab />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="lg:w-80 space-y-6 flex-shrink-0">
                {/* Calendar Widget */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                      Calendar
                    </h3>
                    <span className="text-sm font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                      <FormattedDate />
                    </span>
                  </div>
                  <CalendarWidget />
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-gray-800 flex items-center mb-4">
                    <Clock className="h-5 w-5 mr-2 text-red-500" />
                    Upcoming Deadlines
                  </h3>
                  {/* Upcoming Deadlines Content */}
                  <div className="space-y-4">
                    <DeadlineItem
                      title="Web Development Final Project"
                      date="March 8, 2025"
                      daysLeft={-6}
                      className="CS401"
                    />
                    <DeadlineItem
                      title="Algorithm Analysis"
                      date="March 15, 2025"
                      daysLeft={1}
                      className="CS301"
                    />
                    <DeadlineItem
                      title="Database Design Assignment"
                      date="April 10, 2025"
                      daysLeft={26}
                      className="CS305"
                    />
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-gray-800 flex items-center mb-4">
                    <Clock className="h-5 w-5 mr-2 text-indigo-500" />
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    <ActivityItem
                      message="Maria Garcia submitted Web Development Final Project"
                      time="2 hours ago"
                    />
                    <ActivityItem
                      message="You joined team 'Data Wizards'"
                      time="Yesterday"
                    />
                    <ActivityItem
                      message="New assignment: Database Design posted in CS305"
                      time="3 days ago"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for Sidebar Navigation Items
const SidebarNavItem = ({ icon, text, active, badge }) => {
  return (
    <div
      className={`flex items-center px-6 py-3 cursor-pointer ${
        active
          ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
      }`}
    >
      <div className="mr-3">{icon}</div>
      <span className="font-medium">{text}</span>
      {badge && (
        <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </div>
  );
};

// Component for User Profile
const UserProfile = ({ name, department }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex items-center p-1 cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white font-medium shadow-sm">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="ml-3">
          <div className="text-sm font-medium text-gray-800">{name}</div>
          <div className="text-xs text-gray-500">{department}</div>
        </div>
        <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute bottom-full left-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 mb-2">
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="text-sm font-medium text-gray-800">{name}</div>
            <div className="text-xs text-gray-500">{department}</div>
          </div>
          <div className="py-1">
            <DropdownItem
              icon={<User className="h-4 w-4" />}
              text="Profile Settings"
            />
            <DropdownItem
              icon={<Settings className="h-4 w-4" />}
              text="Account Settings"
            />
            <DropdownItem
              icon={<Moon className="h-4 w-4" />}
              text="Dark Mode"
              toggle={true}
            />
          </div>
          <div className="border-t border-gray-100 py-1">
            <DropdownItem
              icon={<LogOut className="h-4 w-4" />}
              text="Sign Out"
              className="text-red-600"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Component for Dropdown Items
const DropdownItem = ({ icon, text, toggle, className }) => {
  return (
    <div
      className={`flex items-center px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer ${
        className || "text-gray-700"
      }`}
    >
      <div className="mr-2">{icon}</div>
      <span>{text}</span>
      {toggle && (
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
      )}
    </div>
  );
};

// Component for Global Search
const GlobalSearch = () => {
  return (
    <div className="hidden md:flex items-center relative">
      <Search className="h-5 w-5 text-gray-400 absolute left-3" />
      <input
        type="text"
        placeholder="Search..."
        className="py-2 pl-10 pr-4 w-64 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
      />
    </div>
  );
};

// Component for Stat Cards
const StatCard = ({ value, label, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    indigo: "bg-indigo-50 text-indigo-700",
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div
        className={`text-3xl font-bold ${
          color === "blue"
            ? "text-blue-600"
            : color === "amber"
            ? "text-amber-600"
            : "text-indigo-600"
        }`}
      >
        {value}
      </div>
      <div className="text-sm font-medium text-gray-600 mt-1">{label}</div>
      <div
        className={`mt-2 text-xs font-medium ${
          colorClasses[color] || colorClasses.blue
        } px-2 py-1 rounded-full`}
      >
        {color === "blue"
          ? "Active"
          : color === "amber"
          ? "Due Soon"
          : "Pending"}
      </div>
    </div>
  );
};

// Component for Tab Buttons
const TabButton = ({ active, onClick, icon, text, badge }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-2 py-2 text-sm font-medium transition-colors duration-200 ${
        active
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-gray-600 hover:text-gray-800"
      }`}
    >
      <div className="mr-2">{icon}</div>
      <span>{text}</span>
      {badge && (
        <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
};

// Component for Assignments Tab
const AssignmentsTab = () => {
  return (
    <div className="space-y-6">
      {assignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
};

// Component for Assignment Cards
const AssignmentCard = ({ assignment }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{assignment.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{assignment.class}</p>
        </div>
        <div className="flex items-center">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              new Date(assignment.deadline) < new Date()
                ? "bg-red-50 text-red-700"
                : new Date(assignment.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                ? "bg-amber-50 text-amber-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {new Date(assignment.deadline) < new Date()
              ? "Overdue"
              : new Date(assignment.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              ? "Due Soon"
              : "Upcoming"}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <div className="text-xs font-medium text-gray-500">Due Date</div>
          <div className="text-sm font-medium text-gray-800">
            {assignment.deadline}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-gray-500">Team Status</div>
          <div className="text-sm font-medium text-gray-800">
            {assignment.teamStatus}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-gray-500">Submission</div>
          <div className="text-sm font-medium text-gray-800">
            {assignment.submissionStatus}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-medium text-gray-500">Progress</div>
        <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${assignment.progress}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-600 mt-1 text-right">
          {assignment.progress}% complete
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  );
};

// Component for Teams Tab
const TeamsTab = () => {
  return (
    <div className="space-y-6">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
};

// Component for Team Cards
const TeamCard = ({ team }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{team.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{team.project}</p>
        </div>
        <div className="flex items-center">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              team.repoStatus === "Connected"
                ? "bg-green-50 text-green-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            {team.repoStatus}
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
            <div
              key={member.id}
              className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white text-xs font-medium shadow-sm border-2 border-white"
              title={member.name}
            >
              {member.avatar}
            </div>
          ))}
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-medium shadow-sm border-2 border-white">
            +
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-medium text-gray-500">Repository</div>
        <div className="text-sm font-medium text-gray-800">
          {team.repoName || "Not connected"}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
          View Team
        </button>
      </div>
    </div>
  );
};

// Component for Invitations Tab
const InvitationsTab = () => {
  return (
    <div className="space-y-6">
      {invitations.map((invitation) => (
        <InvitationCard key={invitation.id} invitation={invitation} />
      ))}
    </div>
  );
};

// Component for Invitation Cards
const InvitationCard = ({ invitation }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">
            Invitation to join {invitation.teamName}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {invitation.assignment} - {invitation.class}
          </p>
        </div>
        <div className="flex items-center">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-50 text-amber-700">
            Pending
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-medium text-gray-500">From</div>
        <div className="text-sm font-medium text-gray-800">
          {invitation.sender}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-medium text-gray-500">Sent</div>
        <div className="text-sm font-medium text-gray-800">
          {invitation.sentAt}
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
          Decline
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
          Accept
        </button>
      </div>
    </div>
  );
};

// Component for Deadline Items
const DeadlineItem = ({ title, date, daysLeft, className }) => {
  return (
    <div className="flex items-center">
      <div
        className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-medium shadow-sm ${
          daysLeft < 0
            ? "bg-red-500"
            : daysLeft <= 7
            ? "bg-amber-500"
            : "bg-blue-500"
        }`}
      >
        {daysLeft < 0 ? "!" : daysLeft}
      </div>
      <div className="ml-3">
        <div className="text-sm font-medium text-gray-800">{title}</div>
        <div className="flex items-center text-xs text-gray-500">
          <span className="mr-2">{date}</span>
          <span
            className={`${
              daysLeft < 0
                ? "text-red-500"
                : daysLeft <= 7
                ? "text-amber-500"
                : "text-blue-500"
            } font-medium`}
          >
            {daysLeft < 0
              ? "Overdue"
              : daysLeft === 0
              ? "Due today"
              : daysLeft === 1
              ? "Due tomorrow"
              : `Due in ${daysLeft} days`}
          </span>
        </div>
      </div>
    </div>
  );
};

// Component for Activity Items
const ActivityItem = ({ message, time }) => {
  return (
    <div className="flex items-start">
      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
        <Clock className="h-4 w-4" />
      </div>
      <div className="ml-3">
        <div className="text-sm text-gray-800">{message}</div>
        <div className="text-xs text-gray-500">{time}</div>
      </div>
    </div>
  );
};

// Component for Calendar Widget
const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysArray = [];
    const startingDay = firstDay.getDay(); // 0 = Sunday
    
    // Add empty slots for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
      daysArray.push({ day: "", isCurrentMonth: false });
    }
    
    // Add days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      daysArray.push({
        day: i,
        isCurrentMonth: true,
        isToday: new Date().toDateString() === date.toDateString(),
        hasEvent: [8, 15, 22].includes(i), // example days with events
      });
    }
    
    setDaysInMonth(daysArray);
  }, [currentDate]);
  
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };
  
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => navigateMonth(-1)}
          className="text-gray-500 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div className="text-sm font-medium text-gray-800">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <button 
          onClick={() => navigateMonth(1)}
          className="text-gray-500 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdays.map((day, index) => (
          <div key={index} className="text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
        
        {daysInMonth.map((day, index) => (
          <div 
            key={index} 
            className={`text-xs h-8 w-8 rounded-full flex items-center justify-center ${
              !day.isCurrentMonth ? "text-gray-300" : 
              day.isToday ? "bg-blue-600 text-white" : 
              day.hasEvent ? "bg-blue-100 text-blue-800" : "text-gray-700"
            } ${day.isCurrentMonth && !day.isToday ? "hover:bg-gray-100" : ""}`}
          >
            {day.day}
            {day.hasEvent && (
              <div className="absolute bottom-0 w-1 h-1 bg-blue-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
