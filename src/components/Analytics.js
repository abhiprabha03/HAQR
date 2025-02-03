// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // In-memory storage for demonstration; use a database for production
// const analyticsData = {};

// // Endpoint to generate masked URLs
// app.post("/generate", (req, res) => {
//   const { originalUrl } = req.body;

//   // Generate a unique ID for the masked URL
//   const maskedId = Date.now().toString();
//   const maskedUrl = `http://localhost:3000/m/${maskedId}`;

//   // Store analytics data
//   analyticsData[maskedId] = {
//     originalUrl,
//     clicks: 0,
//     locations: [],
//   };

//   res.json({ maskedUrl });
// });

// // Endpoint to handle QR code scans and redirect
// app.get("/m/:id", (req, res) => {
//   const { id } = req.params;
//   const analyticsEntry = analyticsData[id];

//   if (analyticsEntry) {
//     // Increment click count
//     analyticsEntry.clicks += 1;

//     // Optionally track IP address (requires middleware like 'request-ip')
//     const userIp = req.ip; // Simplified IP tracking
//     analyticsEntry.locations.push(userIp);

//     // Redirect to the original URL
//     res.redirect(analyticsEntry.originalUrl);
//   } else {
//     res.status(404).send("QR Code not found.");
//   }
// });

// // Endpoint to get analytics data
// app.get("/analytics-summary", (req, res) => {
//   res.json(analyticsData);
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-key.json"); // Replace with your Firebase service account JSON
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com",
});

const db = admin.firestore();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Middleware to Verify Firebase Auth Token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

// Endpoint to generate QR code and store analytics
app.post("/generate", verifyToken, async (req, res) => {
  const { originalUrl } = req.body;
  const userId = req.user.uid;

  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required." });
  }

  // Generate a unique ID for the masked URL
  const maskedId = Date.now().toString();
  const maskedUrl = `http://localhost:3000/m/${maskedId}`;

  // Store analytics data in Firestore
  await db.collection("qrcodes").doc(maskedId).set({
    originalUrl,
    userId,
    maskedUrl,
    clicks: 0,
    locations: [],
    createdAt: admin.firestore.Timestamp.now(),
  });

  res.json({ maskedUrl });
});

// Endpoint to handle QR code scans and redirect
app.get("/m/:id", async (req, res) => {
  const { id } = req.params;
  const docRef = db.collection("qrcodes").doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return res.status(404).send("QR Code not found.");
  }

  const data = doc.data();
  await docRef.update({
    clicks: admin.firestore.FieldValue.increment(1),
    locations: admin.firestore.FieldValue.arrayUnion(req.ip),
  });

  res.redirect(data.originalUrl);
});

// Endpoint to get analytics data (only for authenticated users)
app.get("/analytics-summary", verifyToken, async (req, res) => {
  const userId = req.user.uid;
  const snapshot = await db.collection("qrcodes").where("userId", "==", userId).get();

  if (snapshot.empty) {
    return res.json({});
  }

  const analyticsData = {};
  snapshot.forEach((doc) => {
    analyticsData[doc.id] = doc.data();
  });

  res.json(analyticsData);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
