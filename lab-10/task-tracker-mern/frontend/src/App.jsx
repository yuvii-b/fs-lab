import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask.title.trim()) return;
    await axios.post(API_URL, newTask);
    setNewTask({ title: '', description: '' });
    fetchTasks();
  };

  const updateTask = async (id, updatedTask) => {
    await axios.put(`${API_URL}/${id}`, updatedTask);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Task Tracker Dashboard
        </Typography>

        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={addTask}>
            Add
          </Button>
        </Box>

        <List>
          {tasks.map((task) => (
            <ListItem
              key={task._id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    color="success"
                    onClick={() => updateTask(task._id, { ...task, status: 'completed' })}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton edge="end" color="error" onClick={() => deleteTask(task._id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={task.title}
                secondary={`${task.description} — ${task.status}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
