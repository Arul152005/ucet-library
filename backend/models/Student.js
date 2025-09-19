const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // Academic Details
  course: {
    type: String,
    trim: true
  },
  year: {
    type: String,
    trim: true
  },
  gpa: {
    type: Number,
    min: 0,
    max: 10.0
  },
  // Contact Details
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  // Parent Information
  fatherName: {
    type: String,
    trim: true
  },
  motherName: {
    type: String,
    trim: true
  },
  fatherMobile: {
    type: String,
    trim: true
  },
  motherMobile: {
    type: String,
    trim: true
  },
  // Scholarship Information
  scholarships: [{
    name: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  }],
  // Hostel Information
  isHosteller: {
    type: Boolean,
    default: false
  },
  hostelName: {
    type: String,
    trim: true
  },
  roomNumber: {
    type: String,
    trim: true
  },
  // Borrowed Books
  borrowedBooks: [{
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    borrowedDate: {
      type: Date,
      default: Date.now
    },
    returnDeadline: {
      type: Date
    }
  }]
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;