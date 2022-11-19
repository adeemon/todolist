import { DeleteButton } from "./DeleteButton"

export const TodoNoteShort = ({id, title, status, onClickHandler}) => {
    return (
        <div className="todo-note-short" >
            <div className="id">{id}</div>
            <div className="title">{title}</div>
            <DeleteButton onClickHandler={onClickHandler} />
        </div>
    )
}