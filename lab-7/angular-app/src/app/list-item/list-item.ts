import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-item',
  imports: [CommonModule],
  templateUrl: './list-item.html',
  styleUrl: './list-item.css',
})
export class ListItem {
  @Input() todos: {text: string, done: boolean}[] = [];
  @Output() toggleDone = new EventEmitter<number>();

  markDone(index: number){
    this.toggleDone.emit(index);
  }
}
