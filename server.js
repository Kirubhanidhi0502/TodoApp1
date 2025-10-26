const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// MongoDB
const mongoURL = process.env.MONGO_URI || 'mongodb://mongo:27017/todoapp';
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Todo schema
const todoSchema = new mongoose.Schema({ title: String, completed: { type: Boolean, default: false } });
const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get('/todos', async (req, res) => res.json(await Todo.find()));
app.post('/todos', async (req, res) => res.json(await new Todo(req.body).save()));
app.put('/todos/:id', async (req, res) => res.json(await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/todos/:id', async (req, res) => { await Todo.findByIdAndDelete(req.params.id); res.json({ message: "Deleted" }); });

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
