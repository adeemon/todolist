import { useDispatch, useSelector } from "react-redux"; 
import {removeTodo, 
    selectAllTodos, 
    toggleMode, 
    closeCreatingWindow, 
    clearUncompleted,
    addEmptyTodo } from './todoNotesSlice';
import { TodoNote } from "./TodoNote";
import { CreateButton } from "../../components/CreateButton/CreateButton";
import React from 'react'
import { EditWindow } from "../../components/EditWindow/EditWindow";
import { Modal } from "../../components/Modal/Modal";
import { EditableTodoNote } from "./EditableTodoNote";
import dayjs from "dayjs";
import "../../styles/todos/todo.css"

export const TodoNotes = () => {
    const dispatch = useDispatch();
    const todoNotes = useSelector(selectAllTodos);
    let noteToEdit;

    const onRemoveTodoHandler = (todo) =>{
        dispatch(removeTodo(todo))
    }

    const onToggleModeHandler = (todo) => {
        dispatch(toggleMode(todo));
    }

    const onClickCreating = () => {
        dispatch(addEmptyTodo(getId()));
    }

    const onCloseCreatingWindow = () => {
        dispatch(closeCreatingWindow());
        dispatch(clearUncompleted());
    }

    const listOfTodos = null || todoNotes.map((element) => {
    if (element.isFullMode === true) {
        noteToEdit = <EditableTodoNote
            id={element.id}
            date={element.date}
            title={element.title}
            body={element.body}
            status={element.status}
            files={element.files}
        />
    } else return <TodoNote 
        id={element.id}
        date={element.date}
        title={element.title}
        body={element.body}
        status={element.status}
        isFullMode={element.isFullMode}
        files={element.files}
        onRemoveHandler={() => onRemoveTodoHandler(element)}
        onToggleModeHandler={() => onToggleModeHandler(element)}
    />
    });

    const getId = () => {
        let timer = new dayjs();
        return (timer.format('YYYYMMDDHHmmss') - 1);
    }

    const newTodoWindow = <EditWindow id={getId()} title={null}
    dateOfNote={null} body={null} status={null} onSaveClickHandler={null} 
    onCloseClickHandler={null} onToggleStatusHandler={null} files={null}/> 

    const modalContent = noteToEdit ? noteToEdit : newTodoWindow;

    return (
        <div className="todo-list-container" >
            {listOfTodos ? listOfTodos : 'Loading!'}
            <CreateButton onClickHandler={onClickCreating} />
            <Modal active={noteToEdit} closeClickHandler={onCloseCreatingWindow} child={modalContent} />
        </div>
    )
}