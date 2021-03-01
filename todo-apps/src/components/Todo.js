import React, { useState, useEffect } from "react";
import TodoDataService from "../services/TodoService";

const Todo = (props) => {
  const initialTodoState = {
    id: null,
    title: "",
    note: "",
    priority: "",
    finish: false,
  };
  const [currentTodo, setCurrentTodo] = useState(initialTodoState);
  const [message, setMessage] = useState("");

  const getTodo = (id) => {
    TodoDataService.get(id)
      .then((response) => {
        setCurrentTodo(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTodo(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  const updateFinished = (status) => {
    var data = {
      id: currentTodo.id,
      title: currentTodo.title,
      note: currentTodo.note,
      priority: currentTodo.priority,
      finished: status,
    };

    TodoDataService.update(currentTodo.id, data)
      .then((response) => {
        setCurrentTodo({ ...currentTodo, finished: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
        alert('Status: ' + e.response.data.status);
      });
  };

  const updateTodo = () => {
    TodoDataService.update(currentTodo.id, currentTodo)
      .then((response) => {
        console.log(response.data);
        setMessage("The Todo was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
        alert('title : ' + e.response.data.title);
        alert('Note : ' + e.response.data.note);
        alert('priority : ' + e.response.data.priority);
      });
  };

  const deleteTodo = () => {
    TodoDataService.remove(currentTodo.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/todos");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTodo ? (
        <div className="edit-form">
          <h4>Todo</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTodo.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="note">Note</label>
              <input
                type="text"
                className="form-control"
                id="note"
                name="note"
                value={currentTodo.note}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                className="form-control"
                id="priority"
                required
                value={currentTodo.priority}
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
            <div className="form-group">
              <label>
                <strong>Status:&nbsp;</strong>
              </label>
              {currentTodo.finished ? "finished" : "Pending"}
            </div>
          </form>

          {currentTodo.finished ? (
            <button
              className="btn btn-primary mr-2"
              onClick={() => updateFinished(false)}
            >
              UnFinished
            </button>
          ) : (
            <button
              className="btn btn-primary mr-2"
              onClick={() => updateFinished(true)}
            >
              Finish
            </button>
          )}

          <button className="btn btn-danger mr-2" onClick={deleteTodo}>
            Delete
          </button>

          <button
            type="submit"
            className="btn btn-success"
            onClick={updateTodo}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Todo...</p>
        </div>
      )}
    </div>
  );
};

export default Todo;
