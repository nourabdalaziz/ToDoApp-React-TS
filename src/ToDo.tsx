import React, { useState } from 'react';
import ToDoFooter from './components/ToDoFooter/ToDoFooter';
import ToDoHeader from './components/ToDoHeader/ToDoHeader';
import ToDoList from './components/ToDoList/ToDoList';
import { ToDoType } from './helpers/models';
import { useEffect } from 'react';

const ToDo: React.FC = () => {
  const [todos, setToDos] = useState<Array<ToDoType>>([]);

  const storage = localStorage.getItem('todos');

  useEffect(() => {
    const localTodos = storage ? JSON.parse(storage) : [];
    setToDos(localTodos);
  }, []);

  const addNewTodo = (todo: ToDoType): void => {
    localStorage.setItem('todos', JSON.stringify([...todos, todo]));
    setToDos([...todos, todo]);
  };

  console.log(todos);
  return (
    <div className='mainContainer'>
      <h1 style={{ color: '#484646' }}>TO DO APP</h1>
      <ToDoHeader addNewTodo={addNewTodo} />
      <ToDoList todos={todos} setToDos={setToDos} />
      <ToDoFooter todos={todos} setToDos={setToDos} />
    </div>
  );
};

export default ToDo;
