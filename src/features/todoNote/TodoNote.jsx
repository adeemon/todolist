import { TodoNoteShort } from "./todoNoteShort"
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { toggleFullMode } from "./todoNotesSlice";

/**
 * Компонент-обертка для отображения задачи.
 * @param {todoObj} todo объект задачи
 * @returns короткую запись задачи. 
 */
export function TodoNote ({id, title, date, status, onRemoveHandler, onToggleModeHandler}) {
    /**
     * Текущая дата.
     */
    const dateNow = new dayjs();
    const dispatch = useDispatch();

    /**
     * Определяет значение класса для корректного отображения фона задачи в соответствии с
     * её статусом выполнения.
     */
    let todoClassName = "todo-note-container ";
    if (dateNow.diff(date) > 0 && status === false) {
        todoClassName = todoClassName + 'overdue-bckg';
    } else {
        todoClassName = todoClassName + (status ? "completed-bckg" : "uncompleted-bckg");
    }

    /**
     * Обработчик нажатия на кнопку "Открыть".
     * @param {} id 
     */
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