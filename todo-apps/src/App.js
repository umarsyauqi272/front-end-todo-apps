import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import TodosList from "./components/TodosList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <a href="/todos" className="navbar-brand">
          Todo-Apps
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/todos"} className="nav-link">
              Todos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/todos"]} component={TodosList} />
          <Route exact path="/add" component={AddTodo} />
          <Route path="/todos/:id" component={Todo} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
