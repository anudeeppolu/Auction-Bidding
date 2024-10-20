const express = require("express");
const router = express.Router();
const Auction = require("./db/auctionModel");
const auth = require("./auth");

// Create a new auction item
router.post("/auction", auth, async (req, res) => {
  const { title, description, startingBid, endDate } = req.body;
  
  try {
    const newAuction = new Auction({
      title,
      description,
      startingBid,
      currentBid: startingBid,
      endDate,
      createdBy: req.user.userId,
    });
    
    const savedAuction = await newAuction.save();
    res.status(201).json(savedAuction);
  } catch (error) {
    res.status(500).json({ message: "Error creating auction item", error });
  }
});

// Get all auction items
// router.get("/auctions", async (req, res) => {
//   try {
//     const auctions = await Auction.find().populate("createdBy", "email");
//     res.status(200).json(auctions);
//     console.log("get",auctions);

//   } catch (error) {
//     console.log("get err",error);
//     res.status(500).json({ message: "Error fetching auction items", error });
//   }
// });
router.get("/auctions", async (req, res) => {
  try {
    const auctions = await Auction.find().populate("createdBy", "email");
    res.status(200).json(auctions);
    console.log("Fetched auctions:", auctions);
  } catch (error) {
    console.error("Error fetching auction items:", error);
    if (error instanceof mongoose.Error.MissingSchemaError) {
      res.status(500).json({ message: "User schema is missing", error });
    } else {
      res.status(500).json({ message: "Error fetching auction items", error });
    }
  }
});


// Get a single auction item by ID
router.get("/auction/:id", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id).populate("createdBy", "email");
    if (!auction) {
      return res.status(404).json({ message: "Auction item not found" });
    }
    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ message: "Error fetching auction item", error });
  }
});

// Update an auction item
router.put("/auction/:id", auth, async (req, res) => {
  const { title, description, startingBid, endDate } = req.body;
  
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: "Auction item not found" });
    }

    if (auction.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    auction.title = title;
    auction.description = description;
    auction.startingBid = startingBid;
    auction.endDate = endDate;

    const updatedAuction = await auction.save();
    res.status(200).json(updatedAuction);
  } catch (error) {
    res.status(500).json({ message: "Error updating auction item", error });
  }
});

// Delete an auction item
router.delete("/auction/:id", auth, async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: "Auction item not found" });
    }

    if (auction.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await auction.remove();
    res.status(200).json({ message: "Auction item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting auction item", error });
  }
});

// Place a bid on an auction item
router.post("/auction/:id/bid", auth, async (req, res) => {
  const { amount } = req.body;

  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: "Auction item not found" });
    }

    if (new Date(auction.endDate) < new Date()) {
      return res.status(400).json({ message: "Auction has already ended" });
    }

    if (amount <= auction.currentBid) {
      return res.status(400).json({ message: "Bid amount must be higher than current bid" });
    }

    const bid = {
      amount,
      userId: req.user.userId,
    };

    auction.bids.push(bid);
    auction.currentBid = amount;

    const updatedAuction = await auction.save();
    res.status(200).json(updatedAuction);
  } catch (error) {
    res.status(500).json({ message: "Error placing bid", error });
  }
});

module.exports = router;
