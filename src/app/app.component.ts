import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: any[] = [];
  newTodo: string = '';
  todoToEditId: number | null = null;
  editText: string = '';

  constructor() {
    // Charger les tâches depuis le localStorage au démarrage
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  addTodo() {
    if (this.newTodo.trim()) {
      const newTask = { id: Date.now(), title: this.newTodo, completed: false };
      this.todos.push(newTask);
      this.saveTodosToLocalStorage();
      this.newTodo = ''; // Réinitialiser l'input
    }
  }

  startEditing(todo: any) {
    this.todoToEditId = todo.id;
    this.editText = todo.title;
  }

  saveEdit(todoId: number) {
    const index = this.todos.findIndex(t => t.id === todoId);
    if (index !== -1) {
      this.todos[index].title = this.editText;
      this.saveTodosToLocalStorage();
      this.todoToEditId = null; // Quitter le mode édition
    }
  }

  toggleTodo(id: number) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodosToLocalStorage();
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveTodosToLocalStorage();
  }

  // Fonction pour sauvegarder les tâches dans le localStorage
  saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
