import React, { useEffect, useState } from "react"
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { firebase } from "../../firebase/firebase"
import { DeleteButton } from "../DeleteButton/DeleteButton";

/**
 * Компонент, который реализует ссылку скачивания с облачного хранилища
 *  и кнопку удаления для данного компонента.
 * 
 * @param {string} fileName названия файла.
 * @param {function} onDeleteHandler обработчик нажатия на кнопку удаления.
 * @returns блок, содержащий в себе ссылку для скачивания и кнопку удаления блока.
 */
export const FileFirebaseDownloadLink = ({fileName, onDeleteHandler}) => {
    const storage = getStorage(firebase);
    let [fileLink, setFileLink] = useState("");

    /**
     * Получается url для скачивания данного файла. 
     * В данной реализации не учитан обработчик кейса, когда файла нет.
     */
    useEffect(()=>{  
        if (fileLink.length < 1) {
            getDownloadURL(ref(storage, fileName))
            .then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                    setFileLink(URL.createObjectURL(blob))
                };
                xhr.open('GET', url);
                xhr.send();
            })
        }
    },[])

    return (
        <div>
            <a href={fileLink} download={fileName}>{fileName}</a>
            <DeleteButton onClickHandler={onDeleteHandler}/>
        </div>
       
    )
}