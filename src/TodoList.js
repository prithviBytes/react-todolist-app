import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: JSON.parse(window.localStorage.getItem("todos") || "[]")
    };
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
    this.remove = this.remove.bind(this);
  }
  create(newTodo) {
    this.setState(
      {
        todos: [...this.state.todos, newTodo]
      },
      () =>
        window.localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  }
  update(id, updatedTodo) {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updatedTodo };
      } else {
        return todo;
      }
    });
    this.setState({ todos: updatedTodos }, () =>
      window.localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  }
  toggleCompletion(id) {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    this.setState({ todos: updatedTodos }, () =>
      window.localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  }
  remove(id) {
    this.setState(
      {
        todos: this.state.todos.filter((t) => t.id !== id)
      },
      () =>
        window.localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  }
  render() {
    let todos = this.state.todos.map((todo) => {
      return (
        <Todo
          task={todo.task}
          id={todo.id}
          key={todo.id}
          completed={todo.completed}
          removeTodo={this.remove}
          updateTodo={this.update}
          toggleTodo={this.toggleCompletion}
        />
      );
    });
    return (
      <div className="TodoList">
        <h1>
          Todo List! <span>A Simple React Todo List App.</span>
        </h1>
        <ul>{todos}</ul>
        <NewTodoForm createTodo={this.create} />
      </div>
    );
  }
}

export default TodoList;
