import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { TodoPriority } from '../entities/todo.entity';

export const TodoPrioritySchema = z.enum([TodoPriority.LOW, TodoPriority.MEDIUM, TodoPriority.HIGH]);

export const CreateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required and must be not empty'),
  description: z.string().optional(),
  priority: TodoPrioritySchema.optional(),
});

export const UpdateTodoSchema = z.object({
  title: z.string().min(1, 'Title must be not empty').optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  priority: TodoPrioritySchema.optional(),
});

export const TodoIdSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a positive integer').transform(val => parseInt(val, 10)),
});

export const TodoFiltersSchema = z.object({
  completed: z.enum(['true', 'false']).optional(),
  priority: TodoPrioritySchema.optional(),
});

const createValidator = <T>(schema: z.ZodSchema<T>, dataSource: 'body' | 'params' | 'query') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[dataSource];
      const result = schema.parse(data);
      
      if (dataSource === 'params' && result && typeof result === 'object' && 'id' in result) {
        req.params.id = (result as { id: number }).id.toString();
      }
      
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      return res.status(500).json({ error: 'Internal validation error' });
    }
  };
};

export const validateCreateTodo = createValidator(CreateTodoSchema, 'body');
export const validateUpdateTodo = createValidator(UpdateTodoSchema, 'body');
export const validateTodoId = createValidator(TodoIdSchema, 'params');
export const validateTodoFilters = createValidator(TodoFiltersSchema, 'query');