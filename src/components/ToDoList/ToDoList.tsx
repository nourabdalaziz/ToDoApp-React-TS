import React from 'react';
import { ToDoType } from '../../helpers/models';
import ToDoItem from '../ToDoItem/ToDoItem';
import './todoList.css';

interface Props {
  todos: ToDoType[];
  setToDos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
}

const ToDoList: React.FC<Props> = ({ todos, setToDos }) => {
  const deleteTodo = (id: string): void => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify([...filteredTodos]));
    setToDos(filteredTodos);
  };

  const finishTodo = (id: string): void => {
    const mappedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
    );
    localStorage.setItem('todos', JSON.stringify(mappedTodos));
    setToDos(mappedTodos);
  };

  const editTodo = (id: string, newTodo: string): void => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, content: newTodo } : todo,
    );
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setToDos(updatedTodos);

    // setToDos(
    //   todos.map((todo) => {
    //     if (todo.id === id) {
    //       const newItem: ToDoType = { ...todo, content: newTodo };
    //       return newItem;
    //     }
    //     return todo;
    //   }),
    // );
  };

  return (
    <div className='todoList-container'>
      {todos.map((todo) => (
        <ToDoItem
          todo={todo}
          key={todo.id}
          deleteTodo={deleteTodo}
          finishTodo={finishTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
};

export default ToDoList;
