const mongoose = require('mongoose');
const { Student, Course, TestMarks, AssignmentSubmission } = require('./models');

const MONGODB_URI = 'mongodb://localhost:27017/brillx';

async function initDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Student.deleteMany({}),
      Course.deleteMany({}),
      TestMarks.deleteMany({}),
      AssignmentSubmission.deleteMany({})
    ]);

    // Create Courses
    const courses = await Course.insertMany([
      {
        course_name: "Advanced Web Development",
        course_code: "AWD101",
        instructor: "Dr. Sarah Johnson",
        duration: "12 weeks",
        batch: "Batch A - 2024"
      },
      {
        course_name: "Data Science Fundamentals", 
        course_code: "DSF201",
        instructor: "Prof. Mike Chen",
        duration: "10 weeks",
        batch: "Batch B - 2024"
      },
      {
        course_name: "Machine Learning",
        course_code: "ML301",
        instructor: "Dr. Emily Watson",
        duration: "14 weeks",
        batch: "Batch C - 2024"
      }
    ]);

    // Create Students
    const students = await Student.insertMany([
      {
        student_id: "STU2024001",
        name: "Alex Johnson",
        email: "alex.johnson@brillx.com",
        contact: "+1234567890",
        clerk_user_id: "user_123",
        enrolled_courses: [courses[0]._id, courses[1]._id]
      },
      {
        student_id: "STU2024002", 
        name: "Sarah Wilson",
        email: "sarah.wilson@brillx.com",
        contact: "+1234567891",
        clerk_user_id: "user_124",
        enrolled_courses: [courses[1]._id, courses[2]._id]
      }
    ]);

    // Create Test Marks
    await TestMarks.insertMany([
      {
        student_id: students[0]._id,
        course_id: courses[0]._id,
        test_name: "Mid-term Assessment",
        marks_obtained: 85,
        total_marks: 100,
        percentage: 85
      },
      {
        student_id: students[0]._id,
        course_id: courses[1]._id, 
        test_name: "Data Analysis Test",
        marks_obtained: 72,
        total_marks: 100,
        percentage: 72
      }
    ]);

    // Create Assignment Submissions
    await AssignmentSubmission.insertMany([
      {
        student_id: students[0]._id,
        course_id: courses[0]._id,
        assignment_name: "React Component Library",
        original_file_name: "react-assignment.pdf",
        status: "graded",
        marks_obtained: 92,
        total_marks: 100,
        feedback: "Excellent work! Great component structure.",
        graded_by: "Dr. Sarah Johnson"
      },
      {
        student_id: students[0]._id,
        course_id: courses[0]._id,
        assignment_name: "Node.js API Development", 
        original_file_name: "node-api.zip",
        status: "submitted" // Pending grading
      }
    ]);

    console.log('Database initialized with sample data!');
    console.log(`Students: ${students.length}`);
    console.log(`Courses: ${courses.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();