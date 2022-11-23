import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const downloadFile = (firebase, path) => {
    const storage = getStorage();
    const starsRef = ref(storage, path);
    getDownloadURL(starsRef)
    .then((url) => {
        return url;
    })
}