const express = require("express");
const router = express.Router();
const Product = require("../models/productsModel");

router.get("/api/sell-now", async (req, res) => {
  // http://localhost:3500/api/sell-now
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

router.get("/api/sell-now/:id", async (req, res) => {
  // http://localhost:3500/api/sell-now/6489ff0cd89ec06d1a80b50a
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

router.post("/api/admin/add-product", async (req, res) => {
  console.log(req.body);
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

router.delete("/api/admin/delete-product/:id", async (req, res) => {

  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Cannot find any product with ID" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});


router.get("/api/search", async (req, res) => {
  // http://localhost:3500/api/search?key=nokia
  try {
    const query = req.query.key;

    if (!query) {
      return res.status(400).json({ message: "No query parameter provided" });
    }

    const keywords = query.split(" ");

    const regexConditions = keywords.map((keyword) => ({
      $or: [
        { brand: { $regex: keyword, $options: "i" } },
        { model: { $regex: keyword, $options: "i" } },
      ],
    }));

    const searchQuery = { $or: regexConditions };

    const productData = await Product.find(searchQuery);

    if (productData.length > 0) {
      res.status(200).json({
        success: true,
        message: "Device Details Found",
        data: productData,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No Device Found with this query _${query}_!`,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Search DB Error" });
  }
});

module.exports = router;
