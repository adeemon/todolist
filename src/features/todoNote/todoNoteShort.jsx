import { useEffect } from "react"
import { DeleteButton } from "../../components/DeleteButton"
import { Toggler } from "../../components/Toggler"

export const TodoNoteShort = ({id, title, status, onToggleModeHandler, onRemoveHandler}) => {
    let togglerContent = !status ? 'Выполнено!' : 'Не выполнено!'
    useEffect(()=>{
        console.log(id,'note rendered!');
    })
    return (
        <div className="todo-note-short" >
            <div className="id">{id}</div>
            <div className="title">{title}</div>
            <Toggler className="toggler-button" body={togglerContent} onClickHandler={onToggleModeHandler} />
            <DeleteButton onClickHandler={onRemoveHandler} />
        </div>
    )
}