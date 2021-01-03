import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Todo.css";

class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createTodo({ ...this.state, id: uuidv4(), completed: false });
    this.setState({ task: "" });
  }
  render() {
    return (
      <div className="NewTodoForm">
        <form
          className="Todo-edit-form new-todo"
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <input
            type="text"
            name="task"
            placeholder="New Todo"
            id="task"
            value={this.state.task}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default NewTodoForm;
