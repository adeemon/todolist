import { createSlice, current } from "@reduxjs/toolkit";
import produce from "immer"
import dayjs from 'dayjs'
import { firebase } from "../../firebase/firebase";
import { getStorage, listAll, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { removeTodoFromStorage } from "../../utility/fileLoader";


const storage = getStorage(firebase);
const storageRef = ref(storage, "/todos/")


const saveTodos = (state) => {
    const todos = current(state).todos;
    let storageFolder = "/todos/"
    todos.forEach(todoObj => {
        const path = storageFolder + todoObj.id + ".txt"
        const storageRef = ref(storage, path);
        const blob = new Blob([JSON.stringify(todoObj, null, 2)], {type : 'text/plain'});
        uploadBytes(storageRef, blob).then(() => {
            console.log(blob);
        })
    })
}


export const todoNotesSlice = createSlice({
    name: 'todoNotes',
    initialState: {
        todos: [],
    },
    reducers: {
        /**
         * Замещает все todo в store на полученные из
         * action.
         * @param {state} state 
         * @param {[todoObj]} action массив объектов todo
         */
        setTodos: (state, action) => {
            state.todos = action.payload;
        },
        /**
         * Добавляет пустую задачу с указанным id в store
         * @param {state} state 
         * @param {number} action id задачи
         */
        addEmptyTodo: (state, action) => {
            let newTodo = {}
            newTodo.id = action.payload;
            newTodo.date = "";
            newTodo.title = "";
            newTodo.status = false;
            newTodo.body = "";
            newTodo.isFullMode = true;
            newTodo.files = [];
            newTodo.isCompleted = false;
            state.todos.unshift(newTodo);
        },
        /**
         * Обновляет задачу в store, также помечая её как корректно заполненную.
         * @param {state} state 
         * @param {todoObj} action новые данные для задачи
         */
        updateTodo: (state, action) => {
            let buf = produce(state.todos, draft => {
                let todoToChange = draft.find((todo) => todo.id === action.payload.id);
                todoToChange.id = action.payload.id;
                todoToChange.title = action.payload.title;
                todoToChange.body = action.payload.body;
                todoToChange.status = action.payload.status;
                todoToChange.date = action.payload.date;
                todoToChange.isCompleted = true;
            });
            state.todos = buf;
            saveTodos(state);
        },
        /**
         * Удаляет задачу с указанным id.
         * @param {state} state 
         * @param {number} action id задачи.
         */
        removeTodo: (state, action) => {
            const newTodos = _removeTodo(action.payload.id, state);
            state.todos = newTodos;
        },
        /**
         * Изменяет статус выполнения задачи на противоположный.
         * @param {state} state 
         * @param {todoObj} action объект задачи, обязательно содержащий id.
         */
        toggleMode: (state, action) => {
            state.todos = produce(state.todos, draft => {
                let todoToChange = draft.find((todo) => todo.id === action.payload.id);
                todoToChange.status = !todoToChange.status;
            });
        },
        /**
         * Открывает задачу как доступную к редактированию.
         * @param {stete} state 
         * @param {number} action id задачи
         */
        toggleFullMode: (state, action) => {
            state.todos = produce(state.todos, draft => {
                let todoToChange = draft.find((todo) => todo.id === action.payload);
                if (todoToChange?.hasOwnProperty('isFullMode')) {
                    todoToChange.isFullMode = !todoToChange.isFullMode;
                }
            });
        },
        /**
         * Удаляет файл из задачи
         * @param {state} state 
         * @param {{string, number}} action объект, содержащий id задачи и fileName название файла.
         */
        removeFileFromTodo: (state, action) => {
            state.todos = produce(state.todos, draft => {
                let todoToChange = draft.find((todo) => todo.id === action.payload.id);
                todoToChange.files = todoToChange.files?.filter((element) => element != action.payload.fileName)})
        },
        /**
         * Закрывает окно просмотра для всех записей.
         * @param {*} state 
         */
        closeCreatingWindow: (state) => {
            state.todos = produce(state.todos, draft => {
                draft.forEach((todo) => todo.isFullMode = false);
            })
        },
        /**
         * Добавляет файл к задаче.
         * @param {*} state 
         * @param {string} action название файла.
         */
        addFile: (state, action) => {
            state.todos = produce(state.todos, draft => {
                let todoToChange = draft.find((todo) => todo.id === action.payload.id);
                todoToChange.files.push(action.payload.fileName)
            })
        },
        /**
         * Удаляет все незаполненные (isCompleted = false) записи.
         * @param {*} state 
         */
        clearUncompleted: (state) => {
            state.todos = state.todos.filter((todo) => todo.isCompleted);
        }       
    }
});

/**
 * Вспомогательная функция, удаляющая запись из хранилища
 * @param {number} id записи, подлежащей удалению.
 * @param {state} state хранилище, из которого запись будет удалена.
 * @returns 
 */
const _removeTodo = (id, state) => {
    let output = current(state.todos).filter((todo) => {
        return todo.id !== id;
    })
    removeTodoFromStorage(id);
    return output;
}

/**
 * Возвращает все задачи. Небоходима для useSelector.
 * @param {*} state 
 * @returns массив задач.
 */
export const selectAllTodos = (state) => {
    console.log((state), 'state')
    return state.todoNotes.todos;
}

export const { addTodo, removeTodo, 
    toggleMode, toggleCreatingWindow,
    toggleFullMode, updateTodo,
    removeFileFromTodo, closeCreatingWindow,
    addFile, clearUncompleted,addEmptyTodo, setTodos } = todoNotesSlice.actions;

export default todoNotesSlice.reducer;