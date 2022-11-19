import { useDispatch, useSelector } from "react-redux"; 
import { addTodo, removeTodo, toggleStatus, openCreatingWindow, selectAllTodos, selectIsCreating } from './todoNotesSlice';
import { TodoNote } from "./TodoNote";
import { CreateButton } from "../../components/CreateButton";
import React, { useEffect } from 'react'

export const TodoNotes = () => {
    const dispatch = useDispatch();
    const todoNotes = useSelector(selectAllTodos);
    const isCreating = useSelector(selectIsCreating);

    const onAddTodoHandler = () => {
        dispatch(openCreatingWindow());
    }

    useEffect(()=>{
        console.log('Render');
        console.log(isCreating);
    },[])

    const onRemoveTodoHandler = (todo) =>{
        dispatch(removeTodo(todo))
    }

    const onOpenCreatingWindowHandler = () => {
        dispatch(openCreatingWindow());
    }

    const listOfTodos = null || todoNotes.map((element) => 
    <TodoNote 
        id={element.id}
        title={element.title}
        body={element.body}
        status={element.status}
        isFullMod={element.isFullMod}
        onClickHandler={() => onRemoveTodoHandler(element)}
    />);
    

    return (
        <div className="todoList-container">
            <div className={isCreating ? "notDisplayed" : null}>Kekwait</div>
            {listOfTodos ? listOfTodos : 'kekw'}
            <CreateButton onClickHandler={onOpenCreatingWindowHandler} />
        </div>
    )
}