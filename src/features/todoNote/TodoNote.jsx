import { TodoNoteShort } from "./todoNoteShort"

export function TodoNote ({id, title, body, status, isFullMode, onRemoveHandler, onToggleModeHandler}) {
    const todoClassName = "todo-note-container " + (status ? "completed-bckg" : "uncompleted-bckg");
    return (
        <div className={todoClassName} >
            {isFullMode ? "kekw" : 
            <TodoNoteShort id={id} title={title} status={status} onRemoveHandler={onRemoveHandler} onToggleModeHandler={onToggleModeHandler}/>}
        </div>
    )
}