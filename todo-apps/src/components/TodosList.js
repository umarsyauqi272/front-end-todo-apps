import React, { useState, useEffect } from "react";
import TodoDataService from "../services/TodoService";
import { Link } from "react-router-dom";

const TodosList = () => {

  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveTodos();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTodos = () => {
    TodoDataService.getAll()
      .then((response) => {
        setTodos(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
        alert(e);
      });
  };

  const refreshList = () => {
    retrieveTodos();
    setCurrentTodo(null);
    setCurrentIndex(-1);
  };

  const setActiveTodo = (todo, index) => {
    setCurrentTodo(todo);
    setCurrentIndex(index);
  };

  const removeAllTodos = () => {
    TodoDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
        alert(e);
      });
  };

  const findByTitle = () => {
    TodoDataService.findByTitle(searchTitle)
      .then((response) => {
        setTodos(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>List</h4>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
        <ul className="list-group" style={{maxHeight:400, overflowY:'scroll'}}>
          {todos &&
            todos.map((todo, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTodo(todo, index)}
                key={index}
              >
                {todo.title}
              </li>
            ))}
        </ul>

        <button className="btn btn-danger btn-block" onClick={removeAllTodos} style={{marginTop:15}}>
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentTodo ? (
          <div>
            <h4>Todo</h4>
              <Link to={"/todos/" + currentTodo.id}>
                <button className="btn btn-primary btn-block" style={{marginBottom:15}}>
                Edit
              </button>
              </Link>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTodo.title}
            </div>
            <div>
              <label>
                <strong>Note:</strong>
              </label>{" "}
              {currentTodo.note}
            </div>
            <div>
              <label>
                <strong>Priority:</strong>
              </label>{" "}
              {currentTodo.priority}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTodo.finished ? "Finished" : "Pending"}
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on to show Todo Item</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodosList;
