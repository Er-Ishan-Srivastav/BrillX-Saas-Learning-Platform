const mongoose = require('mongoose');

// Student Schema
const studentSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: String,
  clerk_user_id: { type: String, required: true, unique: true },
  enrolled_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  created_at: { type: Date, default: Date.now }
});

// Course Schema
const courseSchema = new mongoose.Schema({
  course_name: { type: String, required: true },
  course_code: { type: String, required: true, unique: true },
  instructor: String,
  duration: String,
  description: String,
  batch: String,
  students_enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  created_at: { type: Date, default: Date.now }
});

// Test Marks Schema
const testMarksSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  test_name: { type: String, required: true },
  marks_obtained: { type: Number, required: true },
  total_marks: { type: Number, required: true },
  percentage: Number,
  test_date: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
});

// Assignment Submission Schema
const assignmentSubmissionSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  assignment_name: { type: String, required: true },
  original_file_name: String,
  file_path: String,
  submitted_at: { type: Date, default: Date.now },
  status: { type: String, default: 'submitted' }, // submitted, graded
  marks_obtained: { type: Number, default: 0 },
  total_marks: { type: Number, default: 100 },
  feedback: String,
  graded_by: String,
  graded_at: Date
});

// Models
const Student = mongoose.model('Student', studentSchema);
const Course = mongoose.model('Course', courseSchema);
const TestMarks = mongoose.model('TestMarks', testMarksSchema);
const AssignmentSubmission = mongoose.model('AssignmentSubmission', assignmentSubmissionSchema);

module.exports = {
  Student,
  Course,
  TestMarks,
  AssignmentSubmission
};