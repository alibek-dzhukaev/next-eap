import { CreateTodoDto } from '../api/todos.api';
import { TodoFormFields } from './types';

class Todo {
  todoBodyForRequest(payload: TodoFormFields): CreateTodoDto {
    return {
      title: payload.title,
      completed: payload.completed,
    };
  }
}

export const todo = new Todo();
