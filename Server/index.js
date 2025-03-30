import nodemailer from "nodemailer";
import express, { query } from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from "cors";
import pool from "./db.js";
import { assign } from "nodemailer/lib/shared/index.js";

dotenv.config();
const app = express();
const  PORT = 3000;

app.use(cors({
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());



app.post("/sign-up-form-submission",async (req,res)=>{
    try{
    const query = `INSERT INTO users (email, sectionid, name, password, role) VALUES (($1), ($2), ($3), ($4), ($5))`;
    const section= req.body.section?parseInt(req.body.section):null;
    const recData = [req.body.userEmail,section,`${req.body.fName} ${req.body.lName}`,req.body.password,req.body.role];
    const response = await pool.query(query,recData);
    res.send(req.body);
    }catch(err){
        res.send(err);
        console.error(err);
    }
});


app.post("/log-in-form-submission", async (req, res) => {
    // Generate unique session ID
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 10);
    const sessionId = `${timestamp}-${randomPart}`;
    
    try {
      // Update user's session_id and return the updated row
      const query = `
        UPDATE users
        SET session_id = $1 
        WHERE email = $2 
        RETURNING *;
      `;
      const recData = [sessionId, req.body.userEmail];
      const response = await pool.query(query, recData);
      
      // Check if user exists
      if (response.rows.length === 0) {
        return res.json({ validity: 0, message: "User not found" });
      }
      
      // Verify password
      if (req.body.password == response.rows[0].password) {
        res.json({
          validity: response.rows[0].role == "Student" ? 1 : 2,
          UserName: `${response.rows[0].name}`,
          sessionId: sessionId,
          email:response.rows[0].email,
          role:response.rows[0].role
        });
      } else {
        res.json({ validity: 0, message: "Invalid password" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });






  app.post("/authenticatePrivateComponent", async (req, res) => {
    try {
      const { email, userName, sessionId ,role} = req.body;
      
      // Split userName into first name and last name
      
      const query = `
        SELECT * FROM users
        WHERE email = $1 
        AND name = $2 
        AND session_id = $3
        AND role = $4
      `;
      
      const values = [email, userName, sessionId, role];
      const result = await pool.query(query, values);
      
      if (result.rows.length > 0) {
        // Match found in database
        res.json({ authenticated: true });
      } else {
        // No match found
        res.json({ authenticated: false });
      }
    } catch (err) {
      console.error('Authentication error:', err);
      res.status(500).json({ error: 'Server error', authenticated: false });
    }
  });




  app.post("/dashboard-data-assignments", async (req, res) => {
    try {
        const query = `
        SELECT 
    a.AssignmentID AS id,
    a.Title AS name,
    sub.SubjectName AS class,
    TO_CHAR(a.DueDate, 'Month DD, YYYY') AS deadline,
    a.MinTeamMembers AS minTeamMembers,
    a.MaxTeamMembers AS maxTeamMembers,
    CASE
        WHEN sa.TeamStatus = 'Not Joined' THEN 'Not Joined'
        WHEN sa.TeamStatus = 'Forming Team' THEN 'Forming Team'
        WHEN sa.TeamStatus = 'Team Complete' THEN 'Team Complete'
    END AS teamStatus,
    sa.SubmissionStatus AS submissionStatus,
    sa.Progress AS progress,
    -- Get the team ID if the student is in a team for this assignment
    (SELECT tm.TeamID 
     FROM TeamMembers tm 
     JOIN Teams t ON tm.TeamID = t.TeamID 
     WHERE t.AssignmentID = a.AssignmentID AND tm.StudentEmail = sa.StudentEmail
     LIMIT 1) AS teamId
FROM Assignments a
JOIN StudentsAssignments sa ON a.AssignmentID = sa.AssignmentID
JOIN Subjects sub ON a.SubjectID = sub.SubjectID
WHERE sa.StudentEmail = $1;
        `;
        const test_email = `${req.body.userEmail}`;
        const values = [test_email];
        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




app.post("/dashboard-data-stats", async (req, res) => {

  const query = `
SELECT 
    COALESCE(s.ActiveAssignments, 0) AS activeAssignments,
    COALESCE(s.UpcomingDeadlines, 0) AS upcomingDeadlines,
    COALESCE(i.PendingInvitations, 0) AS pendingInvitations
FROM StudentAssignmentStats s
LEFT JOIN StudentInvitationStats i ON s.StudentEmail = i.StudentEmail
WHERE s.StudentEmail = $1;
  `;
  const values = [req.body.userEmail,];
    try{
      const response = await pool.query(query,values);
      res.json(response.rows[0]);
 
    }catch(err){
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });

    }
});


app.post("/dashboard-data-teams", async (req, res) => {

try{
  const query = `
SELECT 
    t.TeamID AS id,
    t.TeamName AS name,
    t.ProjectName AS project,
    a.Title AS assignment,
    (
        SELECT json_agg(json_build_object(
            'id', tm_user.Email,
            'name', tm_user.Name,
            'avatar', SUBSTRING(tm_user.Name, 1, 1) || SUBSTRING(SPLIT_PART(tm_user.Name, ' ', 2), 1, 1)
        ))
        FROM TeamMembers tm_inner
        JOIN Users tm_user ON tm_inner.StudentEmail = tm_user.Email
        WHERE tm_inner.TeamID = t.TeamID
    ) AS members,
    COALESCE(r.Status, 'Not Connected') AS repoStatus,
    r.RepoName AS repoName
FROM Teams t
JOIN Assignments a ON t.AssignmentID = a.AssignmentID
LEFT JOIN Repositories r ON t.TeamID = r.TeamID
WHERE t.TeamID IN (
    SELECT tm.TeamID 
    FROM TeamMembers tm 
    WHERE tm.StudentEmail = $1
);`;
const values = [req.body.userEmail];
const response = await pool.query(query,values);
res.json(response.rows);

}catch(err){
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
}
});




app.post("/dashboard-data-invitations", async (req, res) => {
  try{
    const query=`
    SELECT 
        i.InvitationID AS id,
        sender.Name AS sender,
        t.TeamName AS teamName,
        a.Title AS assignment,
        sub.SubjectName AS class,
        i.Status AS status,
        CASE
            WHEN i.created_at > NOW() - INTERVAL '24 hours' THEN 
                EXTRACT(HOUR FROM NOW() - i.created_at) || ' hours ago'
            WHEN i.created_at > NOW() - INTERVAL '48 hours' THEN 'Yesterday'
            ELSE EXTRACT(DAY FROM NOW() - i.created_at) || ' days ago'
        END AS sentAt
    FROM Invitations i
    JOIN Users sender ON i.SenderEmail = sender.Email
    JOIN Teams t ON i.TeamID = t.TeamID
    JOIN Assignments a ON t.AssignmentID = a.AssignmentID
    JOIN Subjects sub ON a.SubjectID = sub.SubjectID
    WHERE i.ReceiverEmail = $1;
    `
 
    const values = [`${req.body.userEmail}`];
    const response = await pool.query(query,values);
    res.json(response.rows);
  }catch(err){
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }

});




app.post("/dashboard-data-upcomingDeadlines", async (req, res) => {
  try{
    const query =`SELECT 
    a.title,
    s.subjectname,
    TO_CHAR(a.duedate, 'Month DD, YYYY') AS due_date,
    CASE 
        WHEN a.duedate >= CURRENT_DATE THEN a.duedate - CURRENT_DATE
        ELSE -1 * (CURRENT_DATE - a.duedate)
    END AS days_left
FROM 
    studentsassignments sa
JOIN 
    assignments a ON sa.assignmentid = a.assignmentid
JOIN 
    subjects s ON a.subjectid = s.subjectid
WHERE 
    sa.studentemail = $1
    AND sa.status = 'Pending'
ORDER BY 
    a.duedate ASC
LIMIT 3;`;
    const values = [`${req.body.userEmail}`];
    const response = await pool.query(query,values);
    res.json(response.rows);
  }catch(err){
    console.log(err);
  }
});




app.post("/dashboard-data-events",async (req,res)=>{
  const query = `WITH student_deadlines AS (
  SELECT 
    a.duedate,
    TO_CHAR(a.duedate, 'YYYY-MM') AS year_month,
    EXTRACT(DAY FROM a.duedate) AS day
  FROM studentsassignments sa
  JOIN assignments a ON sa.assignmentid = a.assignmentid
  WHERE sa.studentemail = $1
  AND a.duedate >= CURRENT_DATE
  ORDER BY a.duedate
),
grouped_deadlines AS (
  SELECT 
    year_month,
    ARRAY_AGG(day::integer ORDER BY day) AS days
  FROM student_deadlines
  GROUP BY year_month
)
SELECT 
  json_object_agg(year_month, days) AS events
FROM grouped_deadlines;`;
  const values =[`${req.body.userEmail}`];
  const response = await pool.query(query,values);
  res.json(response.rows[0]);
});





app.post("/tDashboard-data-subjects",async(req,res)=>{
  try{
  const query = 
  `SELECT s.subjectid, s.subjectname
FROM subjects s
JOIN teacherssubjects ts ON s.subjectid = ts.subjectid
WHERE ts.teacheremail = ($1);`
  const values = [`${req.body.userEmail}`];
  const response = await pool.query(query,values);
  res.json(response.rows);
  }catch(err){
    console.error(err);
  }
});
app.post("/tDashboard-create-assignment", async (req, res) => {
  console.log(req.body);
  console.log(req.body.reviews);
  
  const reviewNoList = (req.body.reviews).map((item) => parseInt(item.reviewNo));
  const reviewNameList = (req.body.reviews).map((item) => item.reviewName);
  const reviewDiscriptionList = (req.body.reviews).map((item) => item.description);
  const reviewMarksList = (req.body.reviews).map((item) => parseFloat(item.reviewMarks));
  
  console.log(reviewNoList, reviewNameList, reviewDiscriptionList, reviewMarksList);
  
  try {
    
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const assignmentResult = await client.query(
        `INSERT INTO public.assignments 
        (title, description, duedate, subjectid, createdby, minteammembers, maxteammembers)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING assignmentid`,
        [
          req.body.title, 
          req.body.description, 
          req.body.dueDate, 
          req.body.subject, 
          req.body.createdby, 
          req.body.minMembers, 
          req.body.maxMembers
        ]
      );

      const assignmentId = assignmentResult.rows[0].assignmentid;

      await client.query(
        `INSERT INTO public.assignmentssections (assignmentid, sectionid)
        VALUES ($1, $2)`,
        [assignmentId, req.body.section]
      );

     
      for (let i = 0; i < reviewNoList.length; i++) {
        await client.query(
          `INSERT INTO public.assignment_review_configs 
          (assignmentid, review_number, total_marks, review_description)
          VALUES ($1, $2, $3, $4)`,
          [
            assignmentId, 
            reviewNoList[i], 
            reviewMarksList[i], 
            reviewDiscriptionList[i]
          ]
        );
      }

      const studentsResult = await client.query(
        `SELECT email 
        FROM users 
        WHERE sectionid = $1 AND role = 'Student'`,
        [req.body.section]
      );

    
      for (const student of studentsResult.rows) {
        await client.query(
          `INSERT INTO public.studentsassignments 
          (studentemail, assignmentid, status, progress, submissionstatus, teamstatus)
          VALUES ($1, $2, 'Pending', 0, 'Not Submitted', 'Not Joined')`,
          [student.email, assignmentId]
        );

       
        for (const reviewNo of reviewNoList) {
          await client.query(
            `INSERT INTO public.student_assignment_reviews 
            (assignmentid, studentemail, review_number, obtained_marks, review_status,review_date)
            VALUES ($1, $2, $3, NULL, 'Pending', NULL)`,
            [assignmentId, student.email, reviewNo]
          );
        }
      }

   
      await client.query('COMMIT');

     
      const subjectResult = await client.query(
        `SELECT subjectname FROM subjects WHERE subjectid = $1`,
        [req.body.subject]
      );
      const subject = subjectResult.rows[0].subjectname;

    
      const dataForEmail = {
        createdBy: req.body.createdbyName,
        description: req.body.description,
        title: req.body.title,
        dueDate: req.body.dueDate,
        subject: subject
      };

      if (req.body.sendMail === true || req.body.sendMail === "true") {
        for (const student of studentsResult.rows) {
          await sendAssignmentEmail(student.email, dataForEmail);
        }
      }

      res.json({ assignmentid: assignmentId });

    } catch (err) {
    
      await client.query('ROLLBACK');
      console.error(err);
      res.status(500).json({ error: 'Failed to create assignment' });
    } finally {
  
      client.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database connection error' });
  }
});






app.get("/tDashboard-data-sections",async(req,res)=>{
  try{
    const query = `SELECT sectionid, sectionname 
      FROM public.sections 
      ORDER BY sectionname;`;
    const response = await pool.query(query);
    res.json(response.rows);
  }catch(err){
    console.error(err);}
});


app.post("/tDashboard-add-subject",async(req,res)=>{
  try{
    const query = `WITH new_subject AS (
    INSERT INTO public.subjects 
    (subjectname)
    VALUES 
    ($1)
    RETURNING subjectid
),
teacher_subject_mapping AS (
    INSERT INTO public.teacherssubjects 
    (teacheremail, subjectid)
    SELECT $2, subjectid 
    FROM new_subject
)
SELECT subjectid FROM new_subject;`
  const values = [req.body.newSubject,req.body.userEmail];
  const response = await pool.query(query,values);
  console.log(response);
  res.send(response.rows[0]);
  }catch(err){console.error(err);}
})



app.post("/tDashboard-data-assignments",async(req,res)=>{
  try{
  const query = `SELECT 
    a.assignmentid,
    a.title,
    s.subjectname AS course,
    a.duedate,
    (SELECT COUNT(*) 
     FROM studentsassignments sa 
     WHERE sa.assignmentid = a.assignmentid 
     AND sa.submissionstatus = 'Submitted') AS submissions,
    (SELECT COUNT(*) 
     FROM studentsassignments sa 
     WHERE sa.assignmentid = a.assignmentid) AS totalStudents,
    CASE 
        WHEN a.duedate >= CURRENT_DATE THEN 'active'
        ELSE 'completed'
    END AS status
FROM 
    assignments a
JOIN 
    subjects s ON a.subjectid = s.subjectid
WHERE 
    a.createdby = $1  -- Teacher's email
ORDER BY 
    a.duedate;`
    const values = [req.body.userEmail];

    const response = await pool.query(query,values);
    res.json(response.rows);

  }catch(err){console.error(err);}
});






















app.post("/verify",async(req,res)=>{
    const response = await sendVerificationEmail(req.body.email);
    res.json(response);
});


const baseEmail = process.env.EMAIL_ADDRESS;
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: baseEmail,  
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendVerificationEmail = async (email) => {
    const OTP = Math.floor(100000 + Math.random() * 900000);
    const mailOptions = {
        from: baseEmail,
        to: email,
        subject: "Email Verification",
        html: `<div><p>This email is to verify your account ${email} for the purpose of verification:</p><h3>Your OTP is ${OTP} </h3></div>`
    };
    try {
        await transporter.sendMail(mailOptions);
        return OTP;
    } catch (error) {
        console.error("Error sending email:", error);
        return -1;
    }
};



const sendAssignmentEmail = async (email,dataForEmail) => {
  const mailOptions = {
    from: baseEmail,
    to: email,
    subject: `New Assignment by ${dataForEmail.createdBy}`,
    html: `<div><p>Hey there, a new assignment has been created by ${dataForEmail.createdBy} for the subject ${dataForEmail.subject}:</p><h3>${dataForEmail.title}</h3><p>${dataForEmail.description}</p><p>Due Date: ${dataForEmail.dueDate}</p></div>`
  };
  try{
  await transporter.sendMail(mailOptions);
  return 1;
  }catch(err){
    console.error(err);
    return -1;
  }
}

app.listen( PORT,()=>{console.log(`Running at port ${PORT}`)});