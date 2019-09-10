/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import Card from '../card/Card';
import Storage from '../Storage';
import './Board.scss';

const store = new Storage();

class Board extends Component {
  constructor(props) {
    super(props);
    const cards = store.getBoard().cards;
    this.state = {
      cards: cards
    };
    this.addNewCard = this.addNewCard.bind(this);

    this.onTitleChange = this.onTitleChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }
  addNewCard(e) {
    store.addCard();
    this.setState({
      cards: store.getBoard().cards
    });
  }
  onTitleChange(cardId, newValue) {
    store.renameCard(cardId, newValue);
    const cards = this.state.cards.slice();
    const index = cards.findIndex(el => {
      return el.id === cardId;
    });
    console.log(index);

    cards[index].title = newValue;
    this.setState({ cards: cards });
  }
  addTask(cardId, value) {
    store.addTask(cardId, value);
    this.setState({ cards: store.getBoard().cards });
  }
  updateTask(cardId, taskId, text) {
    store.updateTask(cardId, taskId, text);
    this.setState({ cards: store.getBoard().cards });
  }
  render() {
    const list = this.state.cards.map(card => (
      <Card
        title={card.title}
        tasks={card.tasks}
        key={card.id}
        onTitleChange={this.onTitleChange}
        addTaskHandle={this.addTask}
        updateTaskHandler={this.updateTask}
        id={card.id}
      />
    ));
    return (
      <div className="board">
        {list}
        <button className="addCardBtn" onClick={this.addNewCard}>
          + Add New Card
        </button>
      </div>
    );
  }
}

export default Board;
