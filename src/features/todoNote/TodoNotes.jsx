import { useDispatch, useSelector } from "react-redux"; 
import { addTodo, removeTodo, toggleStatus, openCreatingWindow, selectAllTodos, selectIsCreating, toggleMode, closeCreatingWindow } from './todoNotesSlice';
import { TodoNote } from "./TodoNote";
import { CreateButton } from "../../components/CreateButton";
import React, { useEffect } from 'react'
import { EditWindow } from "../../components/EditWindow";
import { Modal } from "../../components/Modal/Modal";

export const TodoNotes = () => {
    const dispatch = useDispatch();
    const todoNotes = useSelector(selectAllTodos);
    const isCreating = useSelector(selectIsCreating);

    const onAddTodoHandler = () => {
        dispatch(openCreatingWindow());
    }

    useEffect(()=>{
        console.log('Render');
    },[])

    const onRemoveTodoHandler = (todo) =>{
        dispatch(removeTodo(todo))
    }

    const onOpenCreatingWindowHandler = () => {
        dispatch(openCreatingWindow());
    }

    const onToggleModeHandler = (todo) => {
        dispatch(toggleMode(todo));
    }

    const toggleCreatingWindow = (isOpened) => {
        console.log('Clicked!', isOpened);
        dispatch((!isOpened ? closeCreatingWindow() : openCreatingWindow()));
    }

    const listOfTodos = null || todoNotes.map((element) => 
    <TodoNote 
        id={element.id}
        date={element.date}
        title={element.title}
        body={element.body}
        status={element.status}
        isFullMode={element.isFullMode}
        onRemoveHandler={() => onRemoveTodoHandler(element)}
        onToggleModeHandler={() => onToggleModeHandler(element)}
    />);

    return (
        <div className="todo-list-container" >
            {listOfTodos ? listOfTodos : 'kekw'}
            <CreateButton onClickHandler={onOpenCreatingWindowHandler} />
            <Modal active={isCreating} setActive={toggleCreatingWindow} child={
                <EditWindow id={null} title={null}
                date={null} body={null} status={null} onSaveClickHandler={null} 
                onCloseClickHandler={null} onToggleStatusHandler={null} /> 
            } />
        </div>
    )
}