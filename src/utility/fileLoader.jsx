import { firebase } from "../firebase/firebase";
import { getStorage, listAll, ref, getDownloadURL, deleteObject  } from "firebase/storage";

const storage = getStorage(firebase);
const storageRef = ref(storage, "/todos/")

/**
 * Скачивает файл с хранилища.
 * @param {firebase} firebase instance of firebase.
 * @param {string} path to file.
 */
export const downloadFile = (firebase, path) => {
    const storage = getStorage();
    const starsRef = ref(storage, path);
    getDownloadURL(starsRef)
    .then((url) => {
        return url;
    })
}

/**
 * Скачивает массив всех задач из хранилища.
 * @returns массив тасок с бэка.
 */
export const getInitTodos = async () => {
    
    let temp = await getAllRefsPromise();
    let links = [];
    let initialObjects = [];
    for (const referense of temp) {
        const temp = await (getDownloadURL(referense));
        links.push(temp);
    }
    for (const link of links) {
        await fetch(link)
            .then((responce) => responce.json())
            .then((json) => initialObjects.push(json))
    }
    console.log(initialObjects);
    return initialObjects;
}

/**
 * Получает промис, возвращающий массив всех референсов на файлы
 * внутри удаленного хранилища.
 * @returns promise, на ресолве возвращающий массив всех 
 * референсов к файлам в каталоге тасок.
 */
export const getAllRefsPromise = () => {
    return new Promise((resolve) => {
        listAll(storageRef).then((res) => resolve(res.items));
    })
}

/**
 * Удаляет из хранилища таску по id.
 * @param {number} todoId id таски, которая будет удалена с хранилища
 */
export const removeTodoFromStorage = (todoId) => {
    const deleteRef = ref(storageRef, todoId + ".txt");
    deleteObject(deleteRef);
}
