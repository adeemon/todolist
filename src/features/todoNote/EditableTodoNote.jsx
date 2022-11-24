import { EditWindow } from "../../components/EditWindow/EditWindow";

/**
 * Контейнер для окна редактирования записи.
 * @param {todoObj} todo задача.
 * @returns компонент, содержащий в себе окно редактирования.
 */
export function EditableTodoNote({id, title, body, status, files}) {
    let dateOfNote = null;
    let timeOfNote = null;
    
    return (
        <EditWindow id={id} title={title} dateOfNote={dateOfNote} 
        time={timeOfNote} body={body}
        status={status} files={files}/>
    )
}