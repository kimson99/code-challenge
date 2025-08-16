import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import { initTodoRoutes } from './routes/todos.route';
import config from './config';

const app = express();

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    
    app.use('/api/todos', initTodoRoutes());
    
    app.get('/health', (req, res) => {
      res.json({ status: 'OK', message: 'Todo API is running' });
    });
    
    app.listen(config.port, () => {
      console.log(`Server is running on port http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });