import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addFile, getId } from "../../features/todoNote/todoNotesSlice";
import { firebase } from "../../firebase/firebase";
import "./dragDropField.css"

/**
 * Компонента для отображения drag and drop загрузки файлов.
 * @param {number} id 
 * @returns 
 */
export const DragDropField = ({id}) => {
    const dispatch = useDispatch();
    const storage = getStorage(firebase);
    /**
     * Состояние, отображающие перетягивание файла в поле на данный момент.
     */
    const [drag, setDrag] = useState(false);

    /**
     * Устанавливает статус перетягивания в true, если в полне перемещен файл.
     */
    const dragStartHandler = (e) => {
        e.preventDefault();
        setDrag(true);
    }

    /**
     * Отключает отображение перетягивания как активного, если из поля убран перемещаемый файл.
     */
    const dragLeaveHandler = (e) => {
        console.log('stop');
        e.preventDefault();
        setDrag(false);
    }

    /**
     * Загружает файлы во внешнее хранилище и добавляет к записи, когда перемещение успешно выполнено.
     * @param {*} e 
     */
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

    /**
     * Сохраняет в массиве файлов записи новый файл.
     * @param {*} fileName название файла.
     * @param {*} id задачи.
     */
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