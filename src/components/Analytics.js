const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory storage for demonstration; use a database for production
const analyticsData = {};

// Endpoint to generate masked URLs
app.post("/generate", (req, res) => {
  const { originalUrl } = req.body;

  // Generate a unique ID for the masked URL
  const maskedId = Date.now().toString();
  const maskedUrl = `http://localhost:3000/m/${maskedId}`;

  // Store analytics data
  analyticsData[maskedId] = {
    originalUrl,
    clicks: 0,
    locations: [],
  };

  res.json({ maskedUrl });
});

// Endpoint to handle QR code scans and redirect
app.get("/m/:id", (req, res) => {
  const { id } = req.params;
  const analyticsEntry = analyticsData[id];

  if (analyticsEntry) {
    // Increment click count
    analyticsEntry.clicks += 1;

    // Optionally track IP address (requires middleware like 'request-ip')
    const userIp = req.ip; // Simplified IP tracking
    analyticsEntry.locations.push(userIp);

    // Redirect to the original URL
    res.redirect(analyticsEntry.originalUrl);
  } else {
    res.status(404).send("QR Code not found.");
  }
});

// Endpoint to get analytics data
app.get("/analytics-summary", (req, res) => {
  res.json(analyticsData);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
