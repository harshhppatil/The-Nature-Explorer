const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const placesRouter = require('./routes/places');
const authRouter = require('./routes/auth'); // 

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error ❌", err));

app.get("/", (req, res) => {
  res.json({ msg: "Nature Explorer API is running 🌿" });
});

app.use('/places', placesRouter);
app.use('/auth', authRouter); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

const wishlistRouter = require('./routes/wishlist'); 
app.use('/wishlist', wishlistRouter);               
