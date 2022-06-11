import ComeBack from "component/comeback/ComeBack";
import { FC, useEffect } from "react";
import { TodoData, useTodo } from "./hook/useTodo";
import "./TodoList.scss";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

const TodoList: FC = () => {
  const {
    text,
    todoList,
    onChangeInput,
    getTodo,
    addTodo,
    deleteTodo,
    editTodo,
  } = useTodo();

  useEffect(() => {
    getTodo();
  }, []);
  return (
    <div className="todo-page">
      <ComeBack />
      <h1 className="todo-page-title">Todo List</h1>
      <div className="todo-container">
        <form
          className="todo-input-wrap"
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <input
            className="todo-input"
            placeholder="Enter your todo"
            value={text}
            onChange={(e) => onChangeInput(e)}
          ></input>
        </form>
        <div className="todo-item-wrap">
          {!!todoList &&
            todoList.map((item: TodoData, index) => (
              <div className="todo-item" key={index}>
                <label
                  style={
                    item.isCompleted
                      ? { textDecoration: "line-through", color: " #999" }
                      : {}
                  }
                  className="todo-item-text"
                  htmlFor={`${item.id}`}
                >
                  {item.name}
                </label>
                <button
                  id={`${item.id}`}
                  style={{ display: "none" }}
                  onClick={(e) => {
                    editTodo(item.id, !item.isCompleted);
                  }}
                ></button>
                <label className="todo-item-icon" htmlFor="todo-close">
                  <CloseOutlinedIcon color="disabled" />
                </label>
                <button
                  id="todo-close"
                  style={{ display: "none" }}
                  onClick={() => deleteTodo(item.id)}
                ></button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
