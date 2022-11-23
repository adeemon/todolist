import { useForm } from "react-hook-form";
import { addTodo, toggleCreatingWindow, updateTodo } from "../features/todoNote/todoNotesSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { DragDropField } from "./DragDropField/DragDropField";
import dayjs from "dayjs";
import { FileDownloadLink } from "./FileDownloadLink/FileDownloadLink";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { firebase } from "../firebase/firebase";

const useFetch = (filesArray) => {
    const [links, setLinks] = useState({});
    const [loading, setLoading] = useState(true);
      
    useEffect(() => {
        fetchUser();
    });

    const fetchUser = () => {
        let outLinks = {};
        filesArray?.forEach((element) => {
            async function fetchData() {
                const storage = getStorage(firebase);
                const starsRef = ref(storage, "/" + element);
                const result = await getDownloadURL(starsRef);
                const key = String(element);
                outLinks[key] = result;
                const output = {};
                output[key] = result;
                setLinks((prev) => {
                    return Object.assign(prev, output);
                });
                setLoading(false);
            }
            fetchData();
        })
        
        if (filesArray?.length == 0) {
            setLoading(false);
        }
    };
    return { links, loading };
  };


export function EditWindow ({id, title, dateOfNote, time, body, status, files}) {
    const dispatch = useDispatch();
    const {links, loading} = useFetch(files);
    let isSaved = false;
    const statusToRener = status ? "Выполнено" : "Не выполнено";
    const { register, handleSubmit, reset } = useForm();

    useEffect(()=> {
        console.log('render');
        return ()=>{
            if (!isSaved && title) {
                let date = dateOfNote + " " + time;
                dispatch(updateTodo({id, title, date, body,status}));
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
        let {title, status, body} = data;
        let dateFormated = data.dueDate ? dayjs(data.dueDate).format('YYYY-MM-DD') : null;
        let date = dateFormated ? dateFormated + " " + data.dueTime : "";
        status = status === "true" ? true : false;
        dispatch(toggleCreatingWindow());
        onSaveHandler({title, status, 
        body, date, id});
        reset({
            id: null,
            title: null,
            dateOfNote: null,
            time: null,
            body: null,
            status: null
        });
    }

    const getFileLinks = () => {
        console.log(Object.values(links)?.length, 'links length');
        console.log(files?.length, 'files length');
        let fileLinks = files?.map(element => {
            if (links[element]) {
                console.log(element, 'element');
                console.log('link', links[element]);
                return <FileDownloadLink fileName={element} fileLink={links[element]} />
            }
        });
        
        console.log(fileLinks, 'file links');
        return fileLinks;
    }

    return (
        <div>
            {links?.length < files?.length && title ? (<div>Loading</div>) : 
            (
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
            )}
        </div>
    );
}