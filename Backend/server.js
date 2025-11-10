const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { Student, Course, TestMarks, AssignmentSubmission } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/brillx';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// ========== EXISTING ASSIGNMENT APIs ==========

// Get assignment submissions
app.get('/api/assignments/submissions', async (req, res) => {
  try {
    const assignments = await AssignmentSubmission.find()
      .populate('student_id')
      .populate('course_id');
    
    res.json({ success: true, files: assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Submit assignment
app.post('/api/assignments/submit', async (req, res) => {
  try {
    const { studentId, courseId, assignmentName, fileName } = req.body;
    
    const student = await Student.findOne({ student_id: studentId });
    const course = await Course.findById(courseId);
    
    if (!student || !course) {
      return res.status(404).json({ success: false, message: 'Student or course not found' });
    }

    const assignment = new AssignmentSubmission({
      student_id: student._id,
      course_id: courseId,
      assignment_name: assignmentName,
      original_file_name: fileName,
      status: 'submitted'
    });

    await assignment.save();
    
    res.json({ success: true, message: 'Assignment submitted successfully', assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========== EXISTING TEST APIs ==========

// Get test results for a student
app.get('/api/tests/student/:studentId', async (req, res) => {
  try {
    const student = await Student.findOne({ student_id: req.params.studentId });
    
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const testResults = await TestMarks.find({ student_id: student._id })
      .populate('course_id');
    
    res.json({ success: true, results: testResults });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add test marks
app.post('/api/tests/add-marks', async (req, res) => {
  try {
    const { student_id, course_id, test_name, marks_obtained, total_marks } = req.body;
    
    const student = await Student.findOne({ student_id });
    const course = await Course.findById(course_id);
    
    if (!student || !course) {
      return res.status(404).json({ success: false, message: 'Student or course not found' });
    }

    const percentage = (marks_obtained / total_marks) * 100;
    
    const testMarks = new TestMarks({
      student_id: student._id,
      course_id,
      test_name,
      marks_obtained,
      total_marks,
      percentage
    });

    await testMarks.save();
    
    res.json({ success: true, message: 'Test marks added successfully', testMarks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========== NEW DASHBOARD APIs ==========

// Get student dashboard data
app.get('/api/dashboard/:studentId', async (req, res) => {
  try {
    const student = await Student.findOne({ student_id: req.params.studentId })
      .populate('enrolled_courses');
    
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Get assignments and test marks
    const assignments = await AssignmentSubmission.find({ student_id: student._id });
    const testMarks = await TestMarks.find({ student_id: student._id });

    // Calculate statistics
    const gradedAssignments = assignments.filter(a => a.status === 'graded');
    const pendingAssignments = assignments.filter(a => a.status === 'submitted');
    
    // Calculate overall grade from tests and graded assignments
    const allScores = [
      ...gradedAssignments.map(a => a.marks_obtained),
      ...testMarks.map(t => t.marks_obtained)
    ];
    
    const overallGrade = allScores.length > 0 
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
      : 0;

    // Calculate course progress
    const coursesWithProgress = student.enrolled_courses.map(course => ({
      ...course.toObject(),
      progress: Math.min(100, Math.floor(Math.random() * 30) + 70) // Mock progress for now
    }));

    const dashboardData = {
      student: {
        name: student.name,
        id: student.student_id,
        email: student.email,
        completedCourses: coursesWithProgress.filter(c => c.progress === 100).length,
        activeCourses: coursesWithProgress.filter(c => c.progress < 100).length,
        overallGrade,
        assignmentsCompleted: gradedAssignments.length,
        assignmentsPending: pendingAssignments.length,
        testsTaken: testMarks.length,
        studyHours: Math.floor(Math.random() * 50) + 20
      },
      courses: coursesWithProgress,
      recentAssignments: assignments.slice(0, 3).map(a => ({
        name: a.assignment_name,
        course: a.course_id?.course_name || 'Unknown',
        status: a.status,
        score: a.marks_obtained,
        submitted: a.submitted_at
      })),
      recentTests: testMarks.slice(0, 3).map(t => ({
        name: t.test_name,
        course: t.course_id?.course_name || 'Unknown',
        score: t.marks_obtained,
        date: t.test_date
      })),
      stats: {
        totalCourses: student.enrolled_courses.length,
        averageScore: overallGrade,
        completionRate: Math.round((gradedAssignments.length / Math.max(assignments.length, 1)) * 100)
      }
    };

    res.json({ success: true, data: dashboardData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========== NEW STUDENT REPORT APIs ==========

// Get comprehensive student report data
app.get('/api/student/:studentId', async (req, res) => {
  try {
    const student = await Student.findOne({ student_id: req.params.studentId })
      .populate('enrolled_courses');
    
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Get all related data
    const assignments = await AssignmentSubmission.find({ student_id: student._id })
      .populate('course_id');
    
    const testMarks = await TestMarks.find({ student_id: student._id })
      .populate('course_id');

    // Calculate detailed analytics
    const gradedAssignments = assignments.filter(a => a.status === 'graded');
    const assignmentAvg = gradedAssignments.length > 0 
      ? gradedAssignments.reduce((sum, a) => sum + a.marks_obtained, 0) / gradedAssignments.length 
      : 0;
    
    const testAvg = testMarks.length > 0 
      ? testMarks.reduce((sum, t) => sum + t.marks_obtained, 0) / testMarks.length 
      : 0;

    const overallGrade = (assignmentAvg + testAvg) > 0 ? Math.round((assignmentAvg + testAvg) / 2) : 0;

    // Generate grade distribution
    const allScores = [
      ...gradedAssignments.map(a => a.marks_obtained),
      ...testMarks.map(t => t.marks_obtained)
    ];
    
    const gradeDistribution = [0, 0, 0, 0, 0]; // A, B, C, D, F
    allScores.forEach(score => {
      if (score >= 90) gradeDistribution[0]++;
      else if (score >= 80) gradeDistribution[1]++;
      else if (score >= 70) gradeDistribution[2]++;
      else if (score >= 60) gradeDistribution[3]++;
      else gradeDistribution[4]++;
    });

    // Generate subject performance
    const coursePerformance = {};
    student.enrolled_courses.forEach(course => {
      const courseAssignments = assignments.filter(a => a.course_id?._id.equals(course._id));
      const courseTests = testMarks.filter(t => t.course_id?._id.equals(course._id));
      
      const assignmentScores = courseAssignments.filter(a => a.status === 'graded').map(a => a.marks_obtained);
      const testScores = courseTests.map(t => t.marks_obtained);
      const allCourseScores = [...assignmentScores, ...testScores];
      
      coursePerformance[course.course_name] = allCourseScores.length > 0 
        ? Math.round(allCourseScores.reduce((a, b) => a + b, 0) / allCourseScores.length)
        : 0;
    });

    const reportData = {
      student: {
        name: student.name,
        id: student.student_id,
        email: student.email,
        completedCourses: student.enrolled_courses.filter(c => c.progress === 100).length,
        activeCourses: student.enrolled_courses.filter(c => c.progress < 100).length,
        overallGrade,
        assignmentsCompleted: gradedAssignments.length,
        testsTaken: testMarks.length,
        studyHours: Math.floor(Math.random() * 50) + 20
      },
      courses: student.enrolled_courses,
      assignments: assignments.map(a => ({
        id: a._id,
        title: a.assignment_name,
        course: a.course_id?.course_name || 'Unknown',
        submittedDate: a.submitted_at,
        score: a.marks_obtained,
        status: a.status,
        maxScore: a.total_marks,
        feedback: a.feedback
      })),
      tests: testMarks.map(t => ({
        id: t._id,
        title: t.test_name,
        course: t.course_id?.course_name || 'Unknown',
        dateTaken: t.test_date,
        score: t.marks_obtained,
        maxScore: t.total_marks,
        percentage: t.percentage
      })),
      analytics: {
        gradeDistribution,
        subjectPerformance: coursePerformance,
        assignmentAverage: Math.round(assignmentAvg),
        testAverage: Math.round(testAvg),
        improvementAreas: this.generateImprovementAreas(assignments, testMarks)
      }
    };

    res.json({ success: true, data: reportData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Generate improvement areas based on performance
function generateImprovementAreas(assignments, tests) {
  const improvementAreas = [];
  
  // Find lowest scoring tests
  if (tests.length > 0) {
    const lowestTest = tests.reduce((lowest, test) => 
      test.marks_obtained < lowest.marks_obtained ? test : lowest
    );
    improvementAreas.push({
      topic: `Review ${lowestTest.test_name} concepts`,
      priority: 'high',
      course: lowestTest.course_id?.course_name || 'General'
    });
  }

  // Find assignments needing improvement
  const lowScoringAssignments = assignments.filter(a => 
    a.status === 'graded' && a.marks_obtained < 70
  );
  
  if (lowScoringAssignments.length > 0) {
    improvementAreas.push({
      topic: 'Improve assignment submission quality',
      priority: 'medium',
      course: 'All Courses'
    });
  }

  // Add general improvement areas if none found
  if (improvementAreas.length === 0) {
    improvementAreas.push(
      { topic: "Advanced problem solving", priority: "medium", course: "All Courses" },
      { topic: "Time management in tests", priority: "low", course: "All Courses" }
    );
  }

  return improvementAreas;
}

// ========== NEW GRADING APIs ==========

// Grade assignment endpoint
app.post('/api/assignments/grade', async (req, res) => {
  try {
    const { assignmentId, marks_obtained, total_marks, feedback, graded_by } = req.body;
    
    const assignment = await AssignmentSubmission.findByIdAndUpdate(
      assignmentId,
      {
        marks_obtained,
        total_marks,
        feedback,
        graded_by,
        graded_at: new Date(),
        status: 'graded'
      },
      { new: true }
    ).populate('student_id').populate('course_id');

    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    res.json({ 
      success: true, 
      message: 'Assignment graded successfully',
      assignment 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get assignments for grading (instructor view)
app.get('/api/assignments/for-grading', async (req, res) => {
  try {
    const assignments = await AssignmentSubmission.find({ status: 'submitted' })
      .populate('student_id')
      .populate('course_id')
      .sort({ submitted_at: -1 });
    
    res.json({ success: true, assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========== GENERAL APIs ==========

// Get all courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().populate('enrolled_courses');
    res.json({ success: true, students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running', 
    timestamp: new Date().toISOString() 
  });
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
});

app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
});

app.get('/student_report.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/student_report.html'));
});

app.get('/grading.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/grading.html'));
});

app.get('/assignments.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/assignments.html'));
});

app.get('/test.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/test.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard.html`);
  console.log(`📈 Student Report: http://localhost:${PORT}/student_report.html`);
  console.log(`📝 Grading: http://localhost:${PORT}/grading.html`);
  console.log(`📚 Assignments: http://localhost:${PORT}/assignments.html`);
  console.log(`📝 Tests: http://localhost:${PORT}/test.html`);
  console.log(`🔍 API Health: http://localhost:${PORT}/api/health`);
});