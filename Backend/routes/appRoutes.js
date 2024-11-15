const express = require("express");
var router = express.Router();
const Country = require("../models/dataSchema");
router.post("/create", (req, res, next) => {
  const newCountry = new Country({
    name: req.body.name,
    capital: req.body.capital,
  });
  console.log("hello")
  var result=newCountry.save()
  res.status(200).json({ msg: result });
//   newCountry.save((err, country) => {
//     if (err) res.status(500).json({ errmsg: err });
//     res.status(200).json({ msg: country });
//   });
});
router.get("/read", async (req, res, next) => {
  try {
    // Use await to get the actual data from the database, and lean to return plain JSON objects
    const countries = await Country.find({}).lean(); // This will return plain JSON objects
    // Send the data as JSON
    res.status(200).json({ msg: countries });
  } catch (err) {
    // If an error occurs, send a 500 status code with the error message
    res.status(500).json({ errmsg: err.message });
  }
});

router.put("/update", async (req, res, next) => {
  try {
    // Check if ID is provided
    if (!req.body._id) {
      return res.status(400).json({ errmsg: "ID is required" });
    }

    // Find the country by ID
    const country = await Country.findById(req.body._id);
    
    if (!country) {
      return res.status(404).json({ errmsg: "Country not found" });
    }

    // Update the country fields
    country.name = req.body.name;
    country.capital = req.body.capital;

    // Save the updated country
    const updatedCountry = await country.save();

    // Return the updated country
    res.status(200).json({ msg: updatedCountry });

  } catch (err) {
    // Handle any errors that occur
    res.status(500).json({ errmsg: err.message });
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  const countryId = req.params.id;

  try {
    // Find and delete the country by ID
    const country = await Country.findByIdAndDelete(countryId);

    if (!country) {
      return res.status(404).json({ errmsg: "Country not found" });
    }

    res.status(200).json({ msg: "Country deleted", country });
  } catch (err) {
    res.status(500).json({ errmsg: err.message });
  }
});



module.exports = router;
