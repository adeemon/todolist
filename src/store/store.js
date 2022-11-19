import { configureStore } from "@reduxjs/toolkit";
import todoNotesReducer from '../features/todoNote/todoNotesSlice'

export default configureStore({
    reducer: {
        todoNotes: todoNotesReducer
    },
});