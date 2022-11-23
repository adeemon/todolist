import { EditWindow } from "../../components/EditWindow";
import dayjs from "dayjs";
import { useEffect } from "react";

export function EditableTodoNote({id, title, date, body, status, files}) {
    let dateOfNote = null;
    let timeOfNote = null;
    
    return (
        <EditWindow id={id} title={title} dateOfNote={dateOfNote} 
        time={timeOfNote} body={body}
        status={status} files={files}/>
    )
}