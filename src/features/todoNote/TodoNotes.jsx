import { useDispatch, useSelector } from "react-redux"; 
import {removeTodo, 
    selectAllTodos, 
    toggleMode, 
    closeCreatingWindow, 
    clearUncompleted,
    addEmptyTodo,
    setTodos } from './todoNotesSlice';
import { TodoNote } from "./TodoNote";
import { CreateButton } from "../../components/CreateButton/CreateButton";
import React, { useEffect, useState } from 'react'
import { EditWindow } from "../../components/EditWindow/EditWindow";
import { Modal } from "../../components/Modal/Modal";
import { EditableTodoNote } from "./EditableTodoNote";
import dayjs from "dayjs";
import "../../styles/todos/todo.css"
import { getInitTodos, getAllRefsPromise } from "../../utility/fileLoader";

/**
 * Компонент, представляющий из себя базовый контейнер для приложения. 
 * Содержит в себе ключевую логику получения данных.
 * @returns надпись "Загрузка", если данные с облака еще не получены или компонент, содержащий
 * в себе все имеющиеся в облаке задачи и кнопку для создания новой.
 */
export const TodoNotes = () => {
    const dispatch = useDispatch();
    const todoNotes = useSelector(selectAllTodos);
    /**
     * Состояние загрузки.
     */
    const [isLoading, setIsLoading] = useState(true);
    /**
     * Переменная, содержащая в себе запись, подлежащую редактированию.
     * Если в ней есть какая-то задача, то приложение откроет окно редактирования для данной задачи.
     */
    let noteToEdit;

    /**
     * Устанавливает массив задач в соответствии с данными в облачном хранилище.
     */
    useEffect(async () => {
        let listOfRefs = await getAllRefsPromise();
        console.log(listOfRefs);
        if (listOfRefs.length === 0) {
            setIsLoading(false);
        } else {
            console.log('GOGOGO')
            let temp = await getInitTodos();
            console.log(temp);
            dispatch(setTodos(temp));
            setIsLoading(false);
        }
    }, [])

    /**
     * Обработчик события удаления задачи.
     * @param {todoObj} todo объект задачи.
     */
    const onRemoveTodoHandler = (todo) =>{
        dispatch(removeTodo(todo))
    }

    /**
     * Обработчик события изменения статуса задачи.
     * @param {todoObj} todo объект задачи.
     */
    const onToggleModeHandler = (todo) => {
        dispatch(toggleMode(todo));
    }

    /**
     * Обработчик события нажатия на кнопку создания новой записи.
     */
    const onClickCreating = () => {
        dispatch(addEmptyTodo(getId()));
    }

    /**
     * Обработчик события нажатия вне области окна редактирования и создания.
     */
    const onCloseCreatingWindow = () => {
        dispatch(closeCreatingWindow());
        dispatch(clearUncompleted());
    }

    /**
     * Список всех задач, который в ходе создания также может выделить запись для редактирования, 
     * если её isFullMode соответствует true.
     */
    const listOfTodos = null || todoNotes.map((element) => {
    if (element.isFullMode === true) {
        noteToEdit = <EditableTodoNote
            id={element.id}
            date={element.date}
            title={element.title}
            body={element.body}
            status={element.status}
            files={element.files}
        />
    } else return <TodoNote 
        id={element.id}
        date={element.date}
        title={element.title}
        body={element.body}
        status={element.status}
        isFullMode={element.isFullMode}
        files={element.files}
        onRemoveHandler={() => onRemoveTodoHandler(element)}
        onToggleModeHandler={() => onToggleModeHandler(element)}
    />
    });

    /**
     * Получает значение id исходя из текущего времени и даты.
     * @returns @param {number} id из текущей времени и даты.
     */
    const getId = () => {
        let timer = new dayjs();
        return (timer.format('YYYYMMDDHHmmss') - 1);
    }

    /**
     * Шаблон для создания пустого окна редактирования.
     */
    const newTodoWindow = <EditWindow id={getId()} title={null}
    dateOfNote={null} body={null} status={null} onSaveClickHandler={null} 
    onCloseClickHandler={null} onToggleStatusHandler={null} files={null}/> 

    /**
     * Определяет, будет ли отрисована в теле модального окна какая-либо задача 
     * или окно с пустыми значениями.
     */
    const modalContent = noteToEdit ? noteToEdit : newTodoWindow;

    return (
        <div className="todo-list-container" >
            {isLoading 
                ? <div>Загружаем!</div>
                : listOfTodos
            }
            <CreateButton onClickHandler={onClickCreating} />
            <Modal active={noteToEdit} closeClickHandler={onCloseCreatingWindow} child={modalContent} />
        </div>
    )
}