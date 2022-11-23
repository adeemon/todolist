import { TodoNoteShort } from "./todoNoteShort"
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { toggleFullMode } from "./todoNotesSlice";

export function TodoNote ({id, title, date, status, onRemoveHandler, onToggleModeHandler}) {
    const dateNow = new dayjs();
    const dispatch = useDispatch();
    let todoClassName = "todo-note-container ";
    if (dateNow.diff(date) > 0 && status === false) {
        todoClassName = todoClassName + 'overdue-bckg';
    } else {
        todoClassName = todoClassName + (status ? "completed-bckg" : "uncompleted-bckg");
    }

    const onEditHandler = (id) => {
        dispatch(toggleFullMode(id));
    }
        return (
            <div className={todoClassName} >
                <TodoNoteShort id={id} date={date} title={title} 
                status={status} 
                onRemoveHandler={onRemoveHandler} 
                onToggleModeHandler={onToggleModeHandler}
                onEditHandler={() => onEditHandler(id)}/>
            </div>
        )
}