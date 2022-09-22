import React from 'react';
import styles from './TodoItem.module.css';

class TodoItem extends React.Component {
  state = {
    editing: false,
  };

  handleEditing = () => {
    this.setState({
      editing: true,
    });
  };

  handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      this.setState({ editing: false });
    }
  };

  render() {
    const viewMode = {};
    const editMode = {};

    if (this.state.editing) {
      viewMode.display = 'none';
    } else {
      editMode.display = 'none';
    }
    return (
      <li className={styles.item}>
        <div onDoubleClick={this.handleEditing}>
          <input
            type="checkbox"
            style={viewMode}
            className={styles.checkbox}
            checked={this.props.task.completed}
            onChange={() => this.props.handleChangeProps(this.props.task.id)}
          />
          <button
            onClick={() => this.props.deleteTaskProps(this.props.task.id)}
          >
            Delete
          </button>
          {this.props.task.title}
        </div>
        <input
          type="text"
          className={styles.textInput}
          style={editMode}
          value={this.props.task.title}
          onChange={(e) => {
            this.props.setUpdateProps(e.target.value, this.props.task.id);
          }}
          onKeyDown={this.handleUpdatedDone}
        />
      </li>
    );
  }
}
export default TodoItem;
