import uuid from 'uuid';
class Storage {
  constructor() {
    const board = localStorage.getItem('board');
    if (!board) {
      const newBoard = JSON.stringify({
        cards: []
      });
      localStorage.setItem('board', newBoard);
    }
  }
  getBoard() {
    return JSON.parse(localStorage.getItem('board'));
  }
  _getCards() {
    return JSON.parse(localStorage.getItem('board')).cards;
  }
  addCard() {
    let card = [];
    card = this._getCards();
    card.push({
      id: uuid.v4(),
      title: 'New Card',
      tasks: []
    });
    localStorage.setItem('board', JSON.stringify({ cards: card }));
  }

  getCard(id) {
    const board = this._getCards();
    return board.find(el => {
      return el.id === id;
    });
  }

  addTask(cardId, value) {
    const card = this._getCards();
    card.forEach(el => {
      if (el.id === cardId)
        el.tasks.push({
          id: uuid.v4(),
          task: value
        });
    });
    localStorage.setItem('board', JSON.stringify({ cards: card }));
  }
  renameCard(cardId, newTitle) {
    const cards = this._getCards();
    cards.forEach(el => {
      if (el.id === cardId) el.title = newTitle;
    });
    localStorage.setItem('board', JSON.stringify({ cards: cards }));
  }
}

export default Storage;
