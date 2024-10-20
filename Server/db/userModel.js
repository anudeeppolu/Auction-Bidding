// const mongoose = require("mongoose");

// // user schema
// const UserSchema = new mongoose.Schema({
//   // email field
//   email: {
//     type: String,
//     required: [true, "Please provide an Email!"],
//     unique: [true, "Email Exist"],
//   },

//   //   password field
//   password: {
//     type: String,
//     required: [true, "Please provide a password!"],
//     unique: false,
//   },
// });

// // export UserSchema
// module.exports = mongoose.model.Users || mongoose.model("User", UserSchema);



const mongoose = require("mongoose");

// User schema
const UserSchema = new mongoose.Schema({
  // Email field
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  // Password field
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
});

// Export User model
module.exports = mongoose.model("User", UserSchema);
