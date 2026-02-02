import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddItem } from './add-item/add-item';
import { ListItem } from './list-item/list-item';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddItem, ListItem],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('angular-app');
  todos: {text: string, done: boolean}[] = [];

  onTodoAdded(todo: string){
    this.todos.push({text: todo, done: false});
    console.log('Todo added: ', todo);
  }

  onToggleDone(index: number) {
     this.todos[index].done = !this.todos[index].done; 
  }
}
