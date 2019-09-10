/* eslint-disable no-useless-constructor */
import React from 'react';
import './Card.scss';
function Task(props) {
  return (
    <div className="task">
      {props.task}
      <i class="fas fa-pencil-alt" onClick={props.handleTaskEdit}></i>
    </div>
  );
}

function TaskList(props) {
  const tasksList = props.tasks.map(task => (
    <Task
      task={task.task}
      key={task.id}
      handleTaskEdit={props.handleTaskEdit}
    />
  ));
  return <div className="tasks">{tasksList}</div>;
}
class TitleInput extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.titleInput.focus();
  }
  render() {
    return (
      <input
        className="card__titleinput"
        type="text"
        name="title"
        defaultValue={this.props.title}
        onChange={this.props.handleTitleChange}
        ref={input => (this.titleInput = input)}
        onBlur={this.props.handleFocusEnd}
        onKeyPress={e => {
          if (e.which === 27 || e.which === 13) e.target.blur();
        }}
      />
    );
  }
}
class TaskInput extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.taskInput.focus();
    this.acceptHandler = this.acceptHandler.bind(this);
  }
  acceptHandler(value) {
    this.props.handleAddTask(value);
  }
  render() {
    return (
      <input
        type="text"
        className="card__taskinput"
        placeholder="Enter task name for this card"
        ref={input => (this.taskInput = input)}
        onKeyPress={e => {
          if (e.which === 13) this.acceptHandler(e.target.value);
        }}
        onBlur={e => {
          this.acceptHandler(e.target.value);
        }}
      />
    );
  }
}
class TaskEditInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      top: this.props.top,
      left: this.props.left
    };
    return (
      <div className="editLayer">
        <input
          type="text"
          className="editLayer__input"
          defaultValue={this.props.text}
          style={style}
        />
      </div>
    );
  }
}
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTitleEdit: false,
      isAddingTask: false,
      isTaskEdit: false,
      editLayer: {
        text: '',
        x: 0,
        y: 0
      }
    };
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleFocusEnd = this.handleFocusEnd.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleAddBtn = this.handleAddBtn.bind(this);
    this.activateEdit = this.activateEdit.bind(this);
  }

  handleTitleClick(e) {
    this.setState({
      isTitleEdit: true
    });
  }

  handleFocusEnd(e) {
    this.setState({
      isTitleEdit: false
    });
    this.props.onTitleChange(this.props.id, e.target.value);
  }
  handleAddTask(value) {
    if (value.trim().length !== 0)
      this.props.addTaskHandle(this.props.id, value);
    this.setState({
      isAddingTask: false
    });
  }
  handleAddBtn(e) {
    this.setState({
      isAddingTask: true
    });
  }
  activateEdit(e) {
    const rect = e.target.parentNode.getBoundingClientRect();
    console.log(rect);

    const top = rect.top;
    const left = rect.left;
    this.setState({
      isTaskEdit: true,
      editLayer: {
        text: 'text',
        left: left,
        top: top
      }
    });
  }
  render() {
    const isTitleEdit = this.state.isTitleEdit;
    const eLayer = this.state.editLayer;

    return (
      <div className="card">
        <span className="card__edit">
          <i className="far fa-edit"></i>
        </span>
        {isTitleEdit ? (
          <TitleInput
            title={this.props.title}
            handleFocusEnd={this.handleFocusEnd}
          />
        ) : (
          <h2 onClick={this.handleTitleClick}>{this.props.title}</h2>
        )}

        <TaskList tasks={this.props.tasks} handleTaskEdit={this.activateEdit} />
        {this.state.isAddingTask ? (
          <TaskInput handleAddTask={this.handleAddTask} />
        ) : (
          ''
        )}
        <button className="card__newbtn" onClick={this.handleAddBtn}>
          New Task
        </button>
        {this.state.isTaskEdit ? (
          <TaskEditInput
            text={eLayer.text}
            top={eLayer.top}
            left={eLayer.left}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Card;
