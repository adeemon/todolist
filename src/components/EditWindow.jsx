import { useForm } from "react-hook-form";
import { addTodo, removeFileFromTodo, toggleCreatingWindow, updateTodo, toggleFullMode } from "../features/todoNote/todoNotesSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { DragDropField } from "./DragDropField/DragDropField";
import dayjs from "dayjs";
import { FileFirebaseDownloadLink } from "./FileFirebaseDownloadLink/FileFirebaseDownloadLink";

export function EditWindow ({id, title, dateOfNote, time, body, status, files}) {
    const dispatch = useDispatch();
    let [isClosed, setIsClosed] = useState(true);
    const statusToRener = status ? "Выполнено" : "Не выполнено";
    const { register, handleSubmit, reset } = useForm();

    useEffect(()=> {
        return ()=>{
            console.log('attempt to dismount');
            if (isClosed) {
                console.log('toggle of mode')
                dispatch(toggleFullMode(id));
            }
        }
    },[]);

    const onSaveHandler = (newTodo) => {
        if (title) {
            dispatch(updateTodo(newTodo));
        } else {
            dispatch(addTodo(newTodo));
        }
    }

    const onSubmit = (data) => {
        setIsClosed(false);
        console.log('submit!');
        let {title, status, body} = data;
        let dateFormated = data.dueDate ? dayjs(data.dueDate).format('YYYY-MM-DD') : null;
        let date = dateFormated ? dateFormated + " " + data.dueTime : "";
        status = status === "true" ? true : false;
        onSaveHandler({title, status, 
        body, date, id});
        dispatch(toggleFullMode(id));
        reset({
            id: null,
            title: null,
            dateOfNote: null,
            time: null,
            body: null,
            status: null
        });
    }

    const onRemoveFileHandler = (fileName) => {
        setIsClosed(false);
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

    return (
            <form className="edit-window__container" onSubmit={handleSubmit(onSubmit)}>
                <div className="edit-window__title-and-status-container">
                    <input className="edit-window__title"
                        {...register("title", { required: true })} 
                        placeholder="Заголовок" 
                        defaultValue={title}/>
                    <ul className="edit-window__date-setup">
                        <li><input type="date" {...register("dueDate")} defaultValue={dateOfNote} /></li>
                        <li><input type="time" {...register("dueTime")} defaultValue={time} /></li>
                    </ul>
                    <select className="edit-window__status-setup" {...register("status")}>
                        <option value={false}>Не выполнено</option>
                        <option value={true}>Выполнено</option>
                    </select>
                </div>
                <div className="edit-window__body-container">
                    <textarea className="edit-window__body" {...register("body")} 
                        placeholder="Содержание" 
                        defaultValue={body} />
                </div>
                <DragDropField onSaveHandler={()=> console.log('lul')} />
                <div>
                    {getFileLinks()}
                </div>
                <div className="edit-window__buttons">
                    <input type="submit" />
                </div>  
            </form>
    );
}