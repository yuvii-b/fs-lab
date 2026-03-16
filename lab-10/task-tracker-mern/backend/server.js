const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tasktracker')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);

// CRUD Routes
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.get('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: 'after' } // ✅ updated option
  );
  res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
