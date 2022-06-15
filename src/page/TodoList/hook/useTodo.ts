import { ChangeEvent, useState } from "react";
import { todoApi } from "../services/todoApi";

export interface TodoData {
  name: string;
  isCompleted: boolean;
  createAt: number;
  id: string;
}
interface ITodo {
  todoList: TodoData[];
  text: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  getTodo: () => void;
  addTodo: () => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, isCompleted: boolean) => void;
}
export const useTodo = (): ITodo => {
  const [todoList, setTodoLIst] = useState<TodoData[]>([]);
  const [text, setText] = useState<string>("");

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const getTodo = async () => {
    try {
      const response = await todoApi.getTodo();
      setTodoLIst(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    try {
      if (text !== "") {
        const response = await todoApi.postTodo({
          name: text,
          isCompleted: false,
        });
        setTodoLIst([...todoList, response.data]);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await todoApi.deleteTodo(id);
      const newList = todoList.filter(
        (item: TodoData) => item.id !== response.data.id
      );
      setTodoLIst(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async (id: string, isCompleted: boolean) => {
    try {
      const response = await todoApi.putTodo(id, { isCompleted: isCompleted });
      getTodo();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    text,
    todoList,
    onChangeInput,
    getTodo,
    addTodo,
    deleteTodo,
    editTodo,
  };
};
