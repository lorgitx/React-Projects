import { useState, useRef, useEffect } from "react";

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef(null);

  //View to Update Component
  function TodoItemFormUpdate() {
    const [newValue, setNewValue] = useState(todo.Title);

    function handleSubmit(e) {
      e.preventDefault();

      if (newValue == "") {
        alert("The title cannot be empty.");
        
        return;
      }

      onUpdate(todo.id, newValue);
      setIsEdit(false);
    }

    function handleChange(e) {
      setNewValue(e.target.value);
    }

    function handleCancel(e){
      e.preventDefault();
      setIsEdit(false);
    }

    useEffect(() => {
      inputRef.current.focus();
    });

    return (
      <form className="todoItemFormUpdate" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="titleUpdateInput"
          type="text"
          onChange={handleChange}
          value={newValue}
        />
        <input
          className="editBtn"
          type="submit"
          value="Update"
          onClick={handleSubmit}
        />
        <input className="cancelBtn" type="button" value="Cancel" onClick={handleCancel} />
      </form>
    );
  }
  
  function TodoItemInfo() {
    return (
      <div className="todoItem">
        <span>{todo.Title}</span>
        <button className="editBtn" onClick={() => setIsEdit(true)}>
          Edit
        </button>
        <button className="deleteBtn" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    );
  }

  return <>{isEdit ? <TodoItemFormUpdate /> : <TodoItemInfo />}</>;
}
