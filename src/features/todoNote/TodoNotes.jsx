import { useDispatch, useSelector } from "react-redux"; 
import { addTodo, removeTodo, toggleStatus, openCreatingWindow, selectAllTodos, selectIsCreating, toggleMode, closeCreatingWindow, toggleCreatingWindow } from './todoNotesSlice';
import { TodoNote } from "./TodoNote";
import { CreateButton } from "../../components/CreateButton";
import React, { useEffect } from 'react'
import { EditWindow } from "../../components/EditWindow";
import { Modal } from "../../components/Modal/Modal";
import { EditableTodoNote } from "./EditableTodoNote";
import { firebase } from "../../firebase/firebase";
import { getStorage, ref } from "firebase/storage";
import { downloadFile } from "../../utility/fileLoader";
import { FileDownloadLink } from "../../components/FileDownloadLink/FileDownloadLink";

export const TodoNotes = () => {
    const dispatch = useDispatch();
    const todoNotes = useSelector(selectAllTodos);
    const isCreating = useSelector(selectIsCreating);
    let noteToEdit;
    let link;

    const onRemoveTodoHandler = (todo) =>{
        dispatch(removeTodo(todo))
    }

    const onToggleModeHandler = (todo) => {
        dispatch(toggleMode(todo));
    }

    const onToggleCreatingWindow = () => {
        dispatch(toggleCreatingWindow());
    }

    const listOfTodos = null || todoNotes.map((element) => {
    if (element.isFullMode === true && !isCreating) {
        noteToEdit = <EditableTodoNote
            id={element.id}
            date={element.date}
            title={element.title}
            body={element.body}
            status={element.status}
            files={element.files}
            closeClickHandler={onToggleCreatingWindow}
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

    const newTodoWindow = <EditWindow id={null} title={null}
    dateOfNote={null} body={null} status={null} onSaveClickHandler={null} 
    onCloseClickHandler={null} onToggleStatusHandler={null} files={null}/> 

    const modalContent = noteToEdit ? noteToEdit : newTodoWindow;

    return (
        <div className="todo-list-container" >
            {listOfTodos ? listOfTodos : 'Loading!'}
            <CreateButton onClickHandler={onToggleCreatingWindow} />
            { isCreating || noteToEdit 
                ? <Modal active={true} closeClickHandler={onToggleCreatingWindow} child={modalContent} />
                : null}
        </div>
    )
}