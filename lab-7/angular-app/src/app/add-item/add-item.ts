import { Component, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  imports: [FormsModule],
  templateUrl: './add-item.html',
  styleUrl: './add-item.css',
})
export class AddItem {
  newTodo: string = '';
  @Output() todoAdded  = new EventEmitter<string>();
  addTodo(){
    console.log("Entered Text: ", this.newTodo);
    if(this.newTodo.trim()){
      this.todoAdded.emit(this.newTodo);
      this.newTodo = '';
    }
  }
}
