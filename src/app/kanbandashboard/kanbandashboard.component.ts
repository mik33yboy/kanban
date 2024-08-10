import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { Card } from '../card.model'; // Ensure this path is correct

@Component({
  selector: 'app-kanban-dashboard',
  templateUrl: './kanbandashboard.component.html',
  styleUrls: ['./kanbandashboard.component.css']
})
export class KanbanDashboardComponent implements OnInit {
  todoCards: Card[] = [];
  inProgressCards: Card[] = [];
  doneCards: Card[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getCards().subscribe(
      (cards: Card[]) => {
        console.log('Cards received in component:', cards);
        this.todoCards = cards.filter(card => card.status === 'todo');
        this.inProgressCards = cards.filter(card => card.status === 'inprogress');
        this.doneCards = cards.filter(card => card.status === 'done');
      },
      error => {
        console.error('Error in ngOnInit:', error);
      }
    );
  }

  onDragStart(event: DragEvent, cardId: string): void {
    event.dataTransfer?.setData('text/plain', cardId);
    this.setCardPlaceable(true);
  }

  onDragEnd(): void {
    this.setCardPlaceable(false);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
  }

  onDrop(event: DragEvent, columnId: string): void {
    event.preventDefault();
    const cardId = event.dataTransfer!.getData('text/plain');

    let card: Card | undefined;

    card = this.todoCards.find(c => c.id === cardId)
        || this.inProgressCards.find(c => c.id === cardId)
        || this.doneCards.find(c => c.id === cardId);

    if (card) {
      // Remove card from current column
      this.todoCards = this.todoCards.filter(c => c.id !== cardId);
      this.inProgressCards = this.inProgressCards.filter(c => c.id !== cardId);
      this.doneCards = this.doneCards.filter(c => c.id !== cardId);

      // Add card to the new column
      switch (columnId) {
        case 'todo':
          this.todoCards.push(card);
          break;
        case 'in-progress':
          this.inProgressCards.push(card);
          break;
        case 'done':
          this.doneCards.push(card);
          break;
      }

      // Update the card status in the database
      this.updateCardStatus(card.id, columnId);
    }
  }

  private setCardPlaceable(isPlaceable: boolean): void {
    const cardWrappers = document.querySelectorAll('.cards-wrapper');
    cardWrappers.forEach(wrapper => {
      if (isPlaceable) {
        wrapper.classList.add('card-placeable');
      } else {
        wrapper.classList.remove('card-placeable');
      }
    });
  }

  private updateCardStatus(cardId: string, status: string): void {
    this.cardService.updateCardStatus(cardId, status).subscribe(
      response => {
        console.log('Card status updated successfully:', response);
      },
      error => {
        console.error('Error updating card status:', error);
      }
    );
  }
}
