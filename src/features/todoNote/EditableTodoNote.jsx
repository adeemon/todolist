import { Modal } from "../../components/Modal/Modal";
import { EditWindow } from "../../components/EditWindow";
import { toggleFullMode } from "./todoNotesSlice";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

export function EditableTodoNote({id, title, date, body, status, closeClickHandler}) {
    const dispatch = useDispatch();
    let dateOfNote = dayjs(date).format('DD-MM-YYYY');
    let timeOfNote = dayjs(date).format('HH:mm');

    console.log(dateOfNote + ' ' + timeOfNote)
    return (
        <Modal active={true} closeClickHandler={closeClickHandler} child={
            <EditWindow id={id} title={title} dateOfNote={dateOfNote} 
            time={timeOfNote} body={body}
            status={status} />
        } />
    )
}