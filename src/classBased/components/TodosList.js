import React from 'react';
import TodoItem from './TodoItem';

class TodosList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.taskArray.map((todo) => (
          <TodoItem
            key={todo.id}
            task={todo}
            handleChangeProps={this.props.handleChangeProps}
            deleteTaskProps={this.props.deleteTaskProps}
            setUpdateProps={this.props.setUpdateProps}
          />
        ))}
      </ul>
    );
  }
}
export default TodosList;
