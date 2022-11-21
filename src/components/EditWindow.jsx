import { useForm } from "react-hook-form";
import { addTodo, toggleCreatingWindow, updateTodo } from "../features/todoNote/todoNotesSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export function EditWindow ({id, title, dateOfNote, time, body, status}) {
    const dispatch = useDispatch();
    let isSaved = false;
    const onSaveHandler = (newTodo) => {
        if (title) {
            isSaved = true;
            console.log(newTodo);
            dispatch(updateTodo(newTodo));
        } else {
            isSaved = true;
            dispatch(addTodo(newTodo));
        }
    }

    useEffect(()=> {
        return ()=>{
            if (!isSaved && title) {
                let date = dateOfNote + " " + time;
                console.log('Closed without changes');
                dispatch(updateTodo({id, title, date, body,status}));
            }
        }
    })

    const statusToRener = status ? "Выполнено" : "Не выполнено"
    const onSubmit = (data) => {
        let {title, status, body} = data;
        let date = data.dueDate + " " + data.dueTime;
        status = status === "true" ? true : false;
        dispatch(toggleCreatingWindow());
        onSaveHandler({title, status, 
        body, date, id});
    }
    const { register, handleSubmit } = useForm();

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
            <div className="edit-window__buttons">
            <input type="submit" />
            </div>  
        </form>
    );
}