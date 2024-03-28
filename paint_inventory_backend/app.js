require('dotenv').config();
console.log('URI from .env:', process.env.MONGODB_ATLAS_URI);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Paint = require('./models/Paint'); // Make sure the path matches your file structure
const User = require('./models/User'); // Make sure the path matches your file structure

const app = express();
const port = process.env.PORT || 3000;

// Get MongoDB connection URI from environment variables
const atlasUri = process.env.MONGODB_ATLAS_URI;
if (!atlasUri) {
  console.error('MONGODB_ATLAS_URI is not defined in your environment variables');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(atlasUri)
  .then(() => {
    console.log('MongoDB database connection established successfully');
    console.log(`Connected to: ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.name}`);
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(cors());

// Routes and other middleware
app.get('/', (req, res) => {
  res.send('Hello, Paint Inventory Backend!');
});

// Get all paint inventory information API endpoint
app.get('/api/inventory', async (req, res) => {
  try {
    const inventory = await Paint.find({});
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/update-paint/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity, color, status } = req.body;

  try {
    const updatedPaint = await Paint.findByIdAndUpdate(
      id,
      { $set: { quantity, color, status }},
      { new: true, runValidators: true }
    );

    if (!updatedPaint) {
      return res.status(404).json({ message: 'Paint not found with provided ID' });
    }
    res.json(updatedPaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/inituser', async (req, res) => {
  try {
    await User.deleteMany({}); 
    const users = [
      { name: 'John', view: true, update: false, permissionedit:false},
      { name: 'Jane', view: true, update: true, permissionedit:false },
      { name: 'Painter', view: true, update: true, permissionedit:false },
      { name: 'Adam', view: true, update: true, permissionedit:true }
    ];
    await User.insertMany(users); 

    const result = await User.insertMany(users);
    console.log(result); 
    
    res.status(200).send('Users initialized successfully');
  } catch (error) {
    console.error(error); 
    res.status(500).send(error.message);
  }
});

app.post('/api/update-users', async (req, res) => {
  try {
    const usersToUpdate = req.body; 

    
    for (const user of usersToUpdate) {
      const { name, view, update, permissionedit } = user;
      await User.findOneAndUpdate({ name }, { view, update, permissionedit }, { new: true });
    }

    res.status(200).json({ message: 'Users updated successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});