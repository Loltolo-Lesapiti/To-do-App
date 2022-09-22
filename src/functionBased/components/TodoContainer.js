import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodosList from './TodosList';
import Header from './Header';
import InputTodo from './InputTodo';

class TodoContainer extends React.Component {
  state = {
    todos: [],
  };

  // Fetching data from an Api using componentDidMount() method.
  //   componentDidMount() {
  //     fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
  //       .then((response) => response.json())
  //       .then((data) => console.log(data));
  //   }
  /** getting the present todos
   *  and storing them in the local storage */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos);
      localStorage.setItem('todos', temp);
    }
  }

  // Get tasks stored in the localstorage.
  componentDidMount() {
    const temp = JSON.parse(localStorage.getItem('todos'));
    if (temp) {
      this.setState({
        todos: temp,
      });
    }
  }

  handleChange = (id) => {
    // Using setState to change the state of the task
    this.setState((prevState) => ({
      // Return can also go here.
      todos: prevState.todos.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      }),
    }));
  };

  deleteTask = (id) => {
    this.setState({
      todos: [
        ...this.state.todos.filter((task) => task.id !== id),
      ],
    });
  };

  addTask = (title) => {
    const newTask = {
      id: uuidv4(),
      title,
      completed: false,
    };
    this.setState({
      todos: [...this.state.todos, newTask],
    });
  };

  setUpdate = (updatedTitle, id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      }),
    });
  };

  render() {
    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTaskProps={this.addTask} />
          <TodosList
            taskArray={this.state.todos}
            handleChangeProps={this.handleChange}
            deleteTaskProps={this.deleteTask}
            setUpdateProps={this.setUpdate}
          />
        </div>
      </div>
    );
  }
}
export default TodoContainer;
