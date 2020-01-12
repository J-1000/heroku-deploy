const express            = require("express");
const locationController = express.Router();
const Location           = require("../models/locations");

locationController.get("/", (req, res, next) => {
  Location.find().sort({ created_at: -1 }).exec((err, locations) => {
    if (err) { console.error(err); }
    else { res.render("locations/show", { locations }); }
  });
});

locationController.post("/create", (req, res, next) => {
  let place = {
    type: "Point",
    coordinates: [req.body.location.lng, req.body.location.lat]
  };

  const location = new Location({
    place
  });

  location.save((err) => {
    if (err) { res.status(500).send("Error while saving"); }

    res.status(201).send("Added to collection");
  });
});

module.exports = locationController;
