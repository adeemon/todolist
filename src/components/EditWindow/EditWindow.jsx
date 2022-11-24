import { useForm } from "react-hook-form";
import { addTodo, removeFileFromTodo, toggleCreatingWindow, updateTodo, toggleFullMode } from "../../features/todoNote/todoNotesSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { DragDropField } from "../DragDropField/DragDropField";
import dayjs from "dayjs";
import { FileFirebaseDownloadLink } from "../FileFirebaseDownloadLink/FileFirebaseDownloadLink";

export function EditWindow ({id, title, date, body, status, files}) {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    let todoDate = new dayjs(date).format("YYYY-MM-DD");
    let todoTime = new dayjs(date).format("HH:mm");

    const onSaveHandler = (newTodo) => {
            dispatch(updateTodo(newTodo));
    }

    const onSubmit = (data) => {
        let {title, status, body} = data;
        let dateFormated = data.todoDate ? dayjs(data.todoDate).format('YYYY-MM-DD') : null;
        let date = dateFormated ? dateFormated + " " + data.todoTime : "";
        status = status === "true" ? true : false;
        dispatch(toggleFullMode(id));
        onSaveHandler({title, status, 
        body, date, id});
        reset();
    }

    const onRemoveFileHandler = (fileName) => {
        let props = {};
        props.id = id;
        props.fileName = fileName;
        dispatch(removeFileFromTodo(props));
    }

    const getFileLinks = () => {
        let fileLinks = files?.map(element => {
                return <FileFirebaseDownloadLink 
                    fileName={element} 
                    onDeleteHandler={() => onRemoveFileHandler(element)}
                    />
        });        
        return fileLinks;
    }

    const getId = () => {
        let timer = new dayjs();
        return (timer.format('YYYYMMDDHHmmss') - 1);
    }

    return (
            <form className="edit-window__container" onSubmit={handleSubmit(onSubmit)}>
                <div className="edit-window__title-and-status-container">
                    <input className="edit-window__title"
                        {...register("title", { required: true })} 
                        placeholder="Заголовок" 
                        defaultValue={title}/>
                    <ul className="edit-window__date-setup">
                        <li><input type="date" {...register("todoDate")} defaultValue={todoDate} /></li>
                        <li><input type="time" {...register("todoTime")} defaultValue={todoTime} /></li>
                    </ul>
                    <select className="edit-window__status-setup" {...register("status")}>
                        <option selected={status ? "" : "selected"} value={false}>Не выполнено</option>
                        <option selected={status ? "selected" : ""} value={true}>Выполнено</option>
                    </select>
                </div>
                <div className="edit-window__body-container">
                    <textarea className="edit-window__body" {...register("body")} 
                        placeholder="Содержание" 
                        defaultValue={body} />
                </div>
                <DragDropField id={id || getId()} />
                <div>
                    {getFileLinks()}
                </div>
                <div className="edit-window__buttons">
                    <input type="submit" />
                </div>  
            </form>
    );
}