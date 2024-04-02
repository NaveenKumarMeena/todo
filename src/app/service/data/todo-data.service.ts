import { TODO_JPA_API_URL } from './../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../../list-todos/list-todos.component';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
todos: Todo[] = [
  {
    id: 1,
    description: 'Learn to Dance',
    done: false,
    targetDate: new Date(),
  },
  {
    id: 2,
    description: 'Become an Expert angular',
    done: false,
    targetDate: new Date(),
  },];

  constructor(
    private http: HttpClient
  ) { }

  retrieveAllTodos(username: string): Observable<Todo[]> {
    return of(this.todos);
  }

  deleteTodo(username: string, id: number): Observable<void> {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      return of(undefined); // Import 'of' from 'rxjs' if you haven't already
    } else {
      return throwError(`Todo with id ${id} not found`);
    }
  }

  retrieveTodo(username: string, id: number) {
    return this.http.get<Todo>(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`);
  }

  updateTodo(username: string, id: number, updatedTodo: Todo): Observable<Todo> {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      // Update the todo in the array
      this.todos[index] = { ...updatedTodo, id: id };
      return of(this.todos[index]); // Import 'of' from 'rxjs' if you haven't already
    } else {
      return throwError(`Todo with id ${id} not found`);
    }
  }

  createTodo(username: string, todo: Todo): Observable<Todo> {
    // Assuming todo.id should be unique, you can generate a new id here
    const newId = Math.max(...this.todos.map(todo => todo.id)) + 1;
    const newTodo = { ...todo, id: newId };
    
    this.todos.push(newTodo);
    
    return of(newTodo); // Import 'of' from 'rxjs' if you haven't already
  }

}
