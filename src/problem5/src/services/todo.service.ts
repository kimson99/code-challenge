import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Todo, TodoPriority } from '../entities/todo.entity';

export interface CreateTodoDto {
  title: string;
  description?: string;
  priority?: TodoPriority;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: TodoPriority;
}

export interface TodoFilters {
  completed?: boolean;
  priority?: TodoPriority;
}

export class TodoService {
  private todoRepository: Repository<Todo>;

  constructor() {
    this.todoRepository = AppDataSource.getRepository(Todo);
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = createTodoDto.title;
    todo.description = createTodoDto.description || null;
    if (createTodoDto.priority) {
      todo.priority = createTodoDto.priority;
    }

    return await this.todoRepository.save(todo);
  }

  async findAllTodos(filters: TodoFilters): Promise<Todo[]> {
    const queryBuilder = this.todoRepository.createQueryBuilder('todo');
  
    if (filters.completed !== undefined) {
      queryBuilder.andWhere('todo.completed = :completed', { completed: filters.completed });
    }
    
    if (filters.priority) {
      queryBuilder.andWhere('todo.priority = :priority', { priority: filters.priority });
    }
    
    return await queryBuilder.getMany();
  }

  async findTodoById(id: number): Promise<Todo | null> {
    return await this.todoRepository.findOne({ where: { id } });
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo | null> {
    const todo = await this.findTodoById(id);
    
    if (!todo) {
      return null;
    }
    
    if (updateTodoDto.title !== undefined) todo.title = updateTodoDto.title;
    if (updateTodoDto.description !== undefined) todo.description = updateTodoDto.description;
    if (updateTodoDto.completed !== undefined) todo.completed = updateTodoDto.completed;
    if (updateTodoDto.priority !== undefined) todo.priority = updateTodoDto.priority;
    
    return await this.todoRepository.save(todo);
  }

  async deleteTodo(id: number): Promise<boolean> {
    const todo = await this.findTodoById(id);
    
    if (!todo) {
      return false;
    }
    
    await this.todoRepository.remove(todo);
    return true;
  }
}