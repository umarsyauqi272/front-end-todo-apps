import React, { useState } from "react";
import TodoDataService from "../services/TodoService";

const AddTodo = () => {
  const initialTodoState = {
    id: null,
    title: "",
    note: "",
    priority: "",
    published: false,
  };
  const [todo, setTodo] = useState(initialTodoState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const saveTodo = () => {
    var data = {
      title: todo.title,
      note: todo.note,
      priority: todo.priority,
    };

    TodoDataService.create(data)
      .then((response) => {
        setTodo({
          id: response.data.id,
          title: response.data.title,
          note: response.data.note,
          priority: response.data.priority,
          finished: response.data.finished,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e.response);
        alert("Title: " + e.response.data.title);
        alert("Note : " + e.response.data.note);
        alert("Priority : " + e.response.data.priority);
      });
  };

  const newTodo = () => {
    setTodo(initialTodoState);
    setSubmitted(false);
  };

  return (
    <div>
      <div className="submit-form">
        {submitted ? (
          <div className="d-flex flex-column justify-content-center align-content-center align-items-center align-self-center">
            <h4 className="d-flex justify-content-center align-content-center align-items-center align-self-center mb-3">You submitted successfully!</h4>
            <button className="btn btn-success btn-block" onClick={newTodo}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <h4 className="d-flex justify-content-center mb-2">Add Todo To Lists</h4>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={todo.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="note">Note</label>
              <input
                type="text"
                className="form-control"
                id="note"
                required
                value={todo.note}
                onChange={handleInputChange}
                name="note"
              />
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                className="form-control"
                id="priority"
                required
                value={todo.priority}
                onChange={handleInputChange}
                name="priority"
                type="text"
              >
                <option>Pilih</option>
                <option>Biasa</option>
                <option>Penting</option>
                <option>Sangat Penting</option>
                <option>Super Duper Penting</option>
              </select>
            </div>

            <button onClick={saveTodo} className="btn btn-success btn-block">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTodo;
