import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addFile, getId } from "../../features/todoNote/todoNotesSlice";
import { firebase } from "../../firebase/firebase";
import "./dragDropField.css"

export const DragDropField = ({id}) => {
    const dispatch = useDispatch();
    const storage = getStorage(firebase);
    const [drag, setDrag] = useState(false);

    const dragStartHandler = (e) => {
        e.preventDefault();
        setDrag(true);
    }
    const dragLeaveHandler = (e) => {
        console.log('stop');
        e.preventDefault();
        setDrag(false);
    }
    const onDropHandler = (e) => {
        e.preventDefault();
        let files = [...e.dataTransfer.files];
        files.forEach((file) => {
            const storageRef = ref(storage, '/' + file.name);
            uploadBytes(storageRef, file).then(() => {
                const fileName = file.name;
                 onSaveHandler({id, fileName})
            })
        })
    }

    const onSaveHandler = (fileName, id) => {
        dispatch(addFile(fileName, id))
    }
    return (
        <div className="drag-drop">
            {drag
                ? <div onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onDrop = {e => onDropHandler (e)}
                    className="drag-drop__drop">Отпустите файлы для загрузи</div>
                : <div 
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    className="drag-drop__wait">Перетащите файлы для загрузки</div>
            }
        </div>
    )
}