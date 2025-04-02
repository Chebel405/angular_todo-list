import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>(this.todos);

  todos$ = this.todosSubject.asObservable();

  constructor() { }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(title: string): void {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.todos.push(newTodo);
    this.todosSubject.next([...this.todos]);
  }

  toggleTodo(id: number): void {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.todosSubject.next([...this.todos]);
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todosSubject.next([...this.todos]);
  }


}
