import React, { useState } from 'react';
import { create_UUID } from '../../helpers/helperFuns';
import { ToDoType } from '../../helpers/models';
import './todoHeader.css';

interface Props {
  addNewTodo: (todo: ToDoType) => void;
}
const ToDoHeader: React.FC<Props> = ({ addNewTodo }) => {
  const [todoContent, setToDo] = useState<string>('');

  const handleAddToDo = (): void => {
    if (todoContent) {
      const newToDo: ToDoType = {
        id: create_UUID(),
        content: todoContent,
        isDone: false,
      };
      addNewTodo(newToDo);
      setToDo('');
    } else {
      console.log('please enter some text ');
    }
  };

  return (
    <div className='container-header'>
      <input className='header-inputFeild' type='text' value={todoContent} onChange={(e) => setToDo(e.target.value)} />
      <button className='header-button' onClick={handleAddToDo}>+</button>
    </div>
  );
};

export default ToDoHeader;
