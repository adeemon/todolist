import { useState } from "react"
import "./dragDropField.css"

export const DragDropField = ({onSaveHandler}) => {
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
        console.log(e.dataTransfer.files);
        e.preventDefault();
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