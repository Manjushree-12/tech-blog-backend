const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');

const app = express();

// 🛠️ Middleware
app.use(cors());
app.use(express.json());

// 🚪 Mount your routers
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

// 🔗 Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myblogdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
