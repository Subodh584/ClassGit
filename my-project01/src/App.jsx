import StudentDashboard from "./components/StudentDashboard";
import SignUpForStudents from "./Components/SignUpForStudents";
import LogIn from "./Components/LogIn";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateComponent from "./Components/PrivateComponent";
import styles from "./Components/Styles.module.css";
import SignUpForFaculty from "./Components/SignUpForFaculty";
import TeacherDashboard from "./Components/TeacherDashboard";
import TestDashboard from "./Components/Test";
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route element={<PrivateComponent/>}>
      <Route path="/student-dashboard" element={<StudentDashboard />}/>
      <Route path="/admin-dashboard" element={<TeacherDashboard/>}/>
      <Route path="/" element={"Welcome to home page"}/>
    </Route>
    <Route path="/login" element={<LogIn/>}/>
    <Route path="/signup" element={<SignUpForStudents/>}/>
    <Route path="/signupforfaculty" element={<SignUpForFaculty/>}/>
    <Route path="/test" element={<TestDashboard/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
