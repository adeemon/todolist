import { TodoNoteShort } from "../../components/todoNoteShort"

export function TodoNote ({id, title, body, status, isFullMode, onClickHandler}) {
    const todoClassName = "todo-note-container " + (status ? "completed-bckg" : "uncompleted-bckg");
    return (
        <div className={todoClassName} >
            {isFullMode ? "kekw" : <TodoNoteShort id={id} title={title} status={status} onClickHandler={onClickHandler} />}
        </div>
    )
}