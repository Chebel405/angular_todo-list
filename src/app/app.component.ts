import { Component } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
// AppComponent == Controller
export class AppComponent {
  todos: Todo[] = [];
  newTodo = '';
  editMode: boolean = false;
  todoToEdit: any = null;

  constructor(private todoService: TodoService) {
    this.todoService.todos$.subscribe(todos => this.todos = todos);
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.todoService.addTodo(this.newTodo);
      this.newTodo = '';
    }
  }

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }


  editTodo(todo: any) {
    this.editMode = true;
    this.todoToEdit = { ...todo };
  }

  saveTodo() {
    const index = this.todos.findIndex(t => t.id === this.todoToEdit.id);
    if (index !== -1) {
      this.todos[index].title = this.todoToEdit.title;
    }
    this.editMode = false;
    this.todoToEdit = null;
  }


  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}
