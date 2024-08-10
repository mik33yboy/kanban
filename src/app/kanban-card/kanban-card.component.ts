import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.css']
})
export class KanbanCardComponent {
  @Input() card!: { id: string, type: string, title: string, content: string, date: string, bgColor: string, icon: string };
  @Output() dragstart = new EventEmitter<DragEvent>();
  @Output() dragend = new EventEmitter<DragEvent>();

  onDragStart(event: DragEvent) {
    this.dragstart.emit(event);
  }

  onDragEnd(event: DragEvent) {
    this.dragend.emit(event);
  }
}
