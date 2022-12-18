import React from 'react';
import { ToDoType } from '../../helpers/models';
import './todoFooter.css';
import Modal from '../Modal/Modal';
import { useState } from 'react';
interface Props {
  todos: ToDoType[];
  setToDos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
}

const ToDoFooter: React.FC<Props> = ({ todos, setToDos }) => {
  const [showModal, setshowModal] = useState(false);

  const toggleShowModal = (): void => {
    setshowModal(!showModal);
  };

  const handleClearAll = (): void => {
    localStorage.setItem('todos', JSON.stringify([]));
    setToDos([]);
  };

  const pendingTodos = todos.filter((todo) => !todo.isDone);

  return (
    <div className='footer'>
      <div className='footer-text'>You have {pendingTodos.length} pending task/s</div>
      <button onClick={toggleShowModal}>Clear All</button>
      {showModal ? (
        <Modal>
          <div>
            <h4>Are you sure that you want to delete ALL tasks? </h4>
            <div className='modal-buttons'>
              <button onClick={handleClearAll}>Yes</button>
              <button onClick={toggleShowModal}>No</button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default ToDoFooter;
