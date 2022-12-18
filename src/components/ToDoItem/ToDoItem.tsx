import React, { useState } from 'react';
import { ToDoType } from '../../helpers/models';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './todoItem.css';
import Modal from '../Modal/Modal';

interface Props {
  todo: ToDoType;
  deleteTodo: (id: string) => void;
  finishTodo: (id: string) => void;
  editTodo: (id: string, newTodo: string) => void;
}
const ToDoItem: React.FC<Props> = ({ todo, deleteTodo, finishTodo, editTodo }) => {
  const [readyToEdit, setReadyToEdit] = useState<boolean>(false);
  const [editedTodo, setEditedTodo] = useState<string>(todo.content);
  const [showModal, setshowModal] = useState(false);

  const handleDeleteToDo = (): void => {
    deleteTodo(todo.id);
  };

  const handleDone = (): void => {
    finishTodo(todo.id);
  };

  const handleEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      editTodo(todo.id, editedTodo);
      setReadyToEdit(false);
    }
  };

  const toggleShowModal = (): void => {
    setshowModal(!showModal);
  };

  console.log(readyToEdit);
  return (
    <div className='todoitem-container'>
      {readyToEdit ? (
        <div>
          <input
            className='inputForEdit'
            value={editedTodo}
            onChange={(e) => {
              setEditedTodo(e.target.value);
            }}
            onKeyDown={(e) => handleEdit(e)}
          />
        </div>
      ) : todo.isDone ? (
        <s style={{ color: 'green' }}>
          <div>{todo.content}</div>
        </s>
      ) : (
        <div>{todo.content}</div>
      )}

      <div className='todoitem-buttons'>
        <span className='todoBtn' onClick={toggleShowModal}>
          <AiFillDelete />
        </span>

        <span onClick={handleDone}>
          <MdDone />
        </span>

        <span
          onClick={() => {
            if (!readyToEdit && !todo.isDone) {
              setReadyToEdit(!readyToEdit);
            }
          }}>
          <AiFillEdit />
        </span>
      </div>
      {showModal ? (
        <Modal>
          <div>
            <h4>Would you like to delete this task? </h4>
            <div className='modal-buttons'>
              <button onClick={handleDeleteToDo}>Yes</button>
              <button onClick={toggleShowModal}>No</button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default ToDoItem;
