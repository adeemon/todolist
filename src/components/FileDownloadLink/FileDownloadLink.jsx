import { useEffect } from "react"

export const FileDownloadLink = ({fileName, fileLink}) => {
    const downloadHandler = () => {
       const xhr = new XMLHttpRequest(); 
       xhr.responseType = 'blob';
        xhr.onload = (event) => {
        const blob = xhr.response;
        };
        xhr.open('GET', fileLink);
        xhr.send();
    }
    useEffect(()=>{
        console.log('Rendered for', fileName, fileLink);
    });
    return (
        <a href={'#'} onClick={downloadHandler}>{fileName}</a>
    )
}