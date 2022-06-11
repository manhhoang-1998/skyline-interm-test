import axios from "axios";

export interface PutData {
  isCompleted: boolean;
}
export interface PostData {
  name: string;
  isCompleted: boolean;
}

const URL = "https://62a00597a9866630f80561eb.mockapi.io/v1/todos";

export const todoApi = {
  getTodo: () => axios.get(URL),
  postTodo: (data: PostData) => axios.post(URL, data),
  putTodo: (id: string, data: PutData) => axios.put(`${URL}/${id}`, data),
  deleteTodo: (id: string) => axios.delete(`${URL}/${id}`),
};
