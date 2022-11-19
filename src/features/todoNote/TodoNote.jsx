import { TodoNoteShort } from "../../components/todoNoteShort"

export function TodoNote ({id, title, body, status, isFullMode, onClickHandler}) {
    return (
        <div className="todoNotes-container" >
            {isFullMode ? "kekw" : <TodoNoteShort id={id} title={title} status={status} onClickHandler={onClickHandler} />}
        </div>
    )
}