import { useForm } from "react-hook-form";
import { addTodo, closeCreatingWindow } from "../features/todoNote/todoNotesSlice";
import { useDispatch } from "react-redux";

export function EditWindow ({title, date, time, body, status}) {
    const dispatch = useDispatch();
    const onSaveHandler = (newTodo) => {
        console.log('save!', newTodo);
        dispatch(addTodo(newTodo));
    }
    const statusToRener = status ? "Выполнено" : "Не выполнено"
    const onSubmit = (data) => {
        let {title, status, body} = data;
        let date = data.dueDate + " " + data.dueTime;
        onSaveHandler({title, status, body, date});
        dispatch(closeCreatingWindow());
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
                    <li><input type="date" {...register("dueDate")} /></li>
                    <li><input type="time" {...register("dueTime")} /></li>
                </ul>
                <select className="edit-window__status-setup" {...register("status")}>
                    <option value="Не выполнено">Не выполнено</option>
                    <option value="Выполнено">Выполнено</option>
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