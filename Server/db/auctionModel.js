// const mongoose = require("mongoose");

// const bidSchema = new mongoose.Schema({
//   amount: {
//     type: Number,
//     required: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const auctionSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   startingBid: {
//     type: Number,
//     required: true,
//   },
//   currentBid: {
//     type: Number,
//     default: 0,
//   },
//   endDate: {
//     type: Date,
//     required: true,
//   },
//   bids: [bidSchema],
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Auction = mongoose.model("Auction", auctionSchema);
// module.exports = Auction;



const mongoose = require("mongoose");

// Bid Schema
const bidSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ensure this matches the User model name
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Auction Schema
const auctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startingBid: {
    type: Number,
    required: true,
  },
  currentBid: {
    type: Number,
    default: 0,
  },
  endDate: {
    type: Date,
    required: true,
  },
  bids: [bidSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ensure this matches the User model name
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export Auction model
const Auction = mongoose.model("Auction", auctionSchema);
module.exports = Auction;
