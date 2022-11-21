import { TodoNoteShort } from "./todoNoteShort"
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { toggleFullMode, selectIsCreating, openCreatingWindow } from "./todoNotesSlice";
import { useEffect } from "react";
import { Modal } from "../../components/Modal/Modal"
import { EditWindow } from "../../components/EditWindow"

export function TodoNote ({id, title, date, body, status, isFullMode, onRemoveHandler, onToggleModeHandler}) {
    const dateNow = new dayjs();
    const dateFromNote = dayjs(date);
    const dispatch = useDispatch();
    let todoClassName = "todo-note-container ";
    if (dateNow.diff(date) > 0 && status === false) {
        todoClassName = todoClassName + 'overdue-bckg';
    } else {
        todoClassName = todoClassName + (status ? "completed-bckg" : "uncompleted-bckg");
    }

    useEffect(()=> {
        console.log(isFullMode);
    })

    const onEditHandler = (id) => {
        dispatch(toggleFullMode(id));
    }

    if (isFullMode === false) {
        return (
            <div className={todoClassName} >
                {isFullMode ? "kekw" : 
                <TodoNoteShort id={id} date={date} title={title} 
                status={status} 
                onRemoveHandler={onRemoveHandler} 
                onToggleModeHandler={onToggleModeHandler}
                onEditHandler={() => onEditHandler(id)}/>}
            </div>
        )
    }
}