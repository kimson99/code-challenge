import { Router, Request, Response } from 'express';
import { TodoService } from '../services/todo.service';
import { TodoPriority } from '../entities/todo.entity';
import { 
  validateCreateTodo, 
  validateUpdateTodo, 
  validateTodoId, 
  validateTodoFilters 
} from '../validators/todo.validator';

const router = Router();

export const initTodoRoutes = (): Router => {
  const todoService = new TodoService();

  // Create a todo
  router.post('/', validateCreateTodo, async (req: Request, res: Response) => {
    try {
      const { title, description, priority } = req.body;
      const savedTodo = await todoService.createTodo({ title, description, priority });
      res.status(201).json(savedTodo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create todo' });
    }
  });

  // List todos with filters
  router.get('/', validateTodoFilters, async (req: Request, res: Response) => {
    try {
      const { completed, priority } = req.query;
      
      const filters = {
        completed: completed !== undefined ? completed === 'true' : undefined,
        priority: priority as TodoPriority
      };
      
      const todos = await todoService.findAllTodos(filters);
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  });

  // Get todo by ID
  router.get('/:id', validateTodoId, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const todo = await todoService.findTodoById(id);
      
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todo' });
    }
  });

  // Update todo
  router.put('/:id', validateTodoId, validateUpdateTodo, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { title, description, completed, priority } = req.body;
      
      const updatedTodo = await todoService.updateTodo(id, {
        title,
        description,
        completed,
        priority
      });
      
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      res.json(updatedTodo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update todo' });
    }
  });

  // Delete todo
  router.delete('/:id', validateTodoId, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await todoService.deleteTodo(id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  });

  return router;
};