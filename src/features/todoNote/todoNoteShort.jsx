import dayjs from "dayjs"

import { useEffect } from "react"
import { DeleteButton } from "../../components/DeleteButton/DeleteButton"
import { Toggler } from "../../components/Toggler/Toggler"

/**
 * Компонент, который является рендером сокращенного вида задачи
 * Отображает только дату, название, кнопки "открыть" и удаление, а также переключение статуса.
 * @param {todoObj} todo объект задачи.
 * @returns компонент, готовый к рендеру.
 */
export const TodoNoteShort = ({title, date, status, onToggleModeHandler, onRemoveHandler, onEditHandler}) => {
    let togglerContent = status ? 'Выполнено!' : 'Не выполнено!'
    const dateParsed = date?.slice(0, 10);
    const timeParsed = date?.slice(11, 16);
    

    return (
        <div className="todo-note-short" >
            <div className="date">
                <ul>
                    <li>{dateParsed}</li>
                    <li>{timeParsed}</li>
                </ul>
            </div>
            <div className="title">{title}</div>
            <div className="edit">
                <button onClick={onEditHandler}>Открыть</button>
            </div>
            <Toggler className="toggler-button" body={togglerContent} onClickHandler={onToggleModeHandler} />
            <DeleteButton onClickHandler={onRemoveHandler} />
        </div>
    )
}