import { useEffect, useState } from "react"
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { firebase } from "../../firebase/firebase"
import { DeleteButton } from "../DeleteButton/DeleteButton";

export const FileFirebaseDownloadLink = ({fileName, onDeleteHandler}) => {
    const storage = getStorage(firebase);
    let [fileLink, setFileLink] = useState("");

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